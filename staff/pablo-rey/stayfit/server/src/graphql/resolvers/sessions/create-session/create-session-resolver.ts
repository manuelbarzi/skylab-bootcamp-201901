import { IsIn, IsNotEmpty } from 'class-validator';
import { Arg, Authorized, Ctx, Field, InputType, Mutation, Resolver } from 'type-graphql';
import { MyContext } from '../../../../common/types/MyContext';
import { Provider, ProviderModel } from '../../../../models/provider';
import { LogicError } from '../../../../common/errors';
import { SessionModel, SESSIONSTATUS, SESSIONVISIBILITY } from '../../../../models/session';
import { UserModel, User } from '../../../../models/user';
import { ONLY_ADMINS_OF_PROVIDER } from '../../../middleware/authChecker';
import { SessionTypeModel } from '../../../../models/session-type';
import moment = require('moment');

@InputType()
export class CreateSessionsInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsNotEmpty()
  providerId: string;

  @Field(() => [String])
  coachesId: string[];

  @Field(() => Date)
  startTime: Date;

  @Field(() => Date)
  endTime: Date;

  @Field(() => [Date])
  repeat?: Date[];

  @Field()
  maxAttendants: number;

  @Field()
  typeId: string;

  @Field()
  @IsIn(SESSIONSTATUS)
  status: string;

  @Field()
  @IsIn(SESSIONVISIBILITY)
  visibility: string;
}

@Resolver(Provider)
export class CreateSessionsResolver {
  @Authorized(ONLY_ADMINS_OF_PROVIDER)
  @Mutation(returns => [String])
  async createSessions(@Arg('data') data: CreateSessionsInput, @Ctx() ctx: MyContext) {
    const {
      title,
      providerId,
      coachesId,
      repeat = [],
      maxAttendants,
      typeId,
      status,
      visibility,
    } = data;
    let {  startTime,
      endTime} = data;

    const provider = ctx.provider || (await ProviderModel.findById(providerId));
    if (!provider) throw new LogicError('provider is required');
    let coaches: User[] = [];
    if (coachesId && coachesId.length) {
      for (let id of coachesId) {
        const coach = await UserModel.findById(id);
        if (!coach) throw new LogicError(`id ${id} not exist`);
        coaches.push(coach);
      }
    }
    
    let sessionsId : string[] = []
    const duration = moment.duration(moment(startTime).diff(endTime))
    const [startDate,startTimestamp] = moment(startTime).format('YYYY-MM-DD hh:mm:ss').split(' ');

    const repeatingTime : [[Date, Date]] = [[startTime, endTime]]
    for (let day of repeat) {
      const newDate = moment(day).format('YYYY-MM-DD');
      const newStart = moment(`${newDate} ${startTimestamp}`, 'YYYY-MM-DD hh:mm:ss', true).toDate();
      const newEnd = moment(newStart).add(duration).toDate();
      if (!repeatingTime.some(([start]) => moment(start).isSame(newStart))) {
        repeatingTime.push([newStart, newEnd]);
      }

    }
    for (let [start, end] of repeatingTime) {
      const _type = await SessionTypeModel.findById(typeId);
      if (!_type) throw new LogicError('SessionType is required');
      const session = await SessionModel.create({
        title,
        provider,
        coaches,
        startTime: start,
        endTime: end,
        maxAttendants,
        type: _type,
        status,
        visibility,
      });
      sessionsId.push(session.id);
    }
    return sessionsId;
  }
}
