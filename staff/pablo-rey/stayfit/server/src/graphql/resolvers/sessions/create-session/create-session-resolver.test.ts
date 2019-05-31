import { gql } from 'apollo-server';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as dotenv from 'dotenv';
import * as moment from 'moment';
import * as mongoose from 'mongoose';
import { createTestProvider, deleteModels } from '../../../../common/test-utils';
import { ACTIVE, PUBLIC, SessionModel } from '../../../../models/session';
import { SessionTypeModel } from '../../../../models/session-type';
import { gCall } from '../../../../utils/testing-utils/gqlCall';
import { CreateSessionsInput } from './create-session-resolver';
import { random } from './../../../../utils/random';

chai.use(chaiAsPromised);
const { expect } = chai;

dotenv.config();
const {
  env: { MONGODB_URL_TESTING },
} = process;

describe('create sessions', function() {
  before(() => mongoose.connect(MONGODB_URL_TESTING!, { useNewUrlParser: true }));
  after(async () => await mongoose.disconnect());

  describe('create sessions', function() {
    this.timeout(100000);
    beforeEach(() => deleteModels());

    const mutation = gql`
      mutation CreateSession($data: CreateSessionsInput!) {
        createSessions(data: $data)
      }
    `;

    async function itWithParams(start: string, end: string, repeat: Date[]) {
      const { name, superadmin, provider, coachesId } = await createTestProvider({});
      const type = await SessionTypeModel.findOne({ type: 'wod', provider });
      const title = 'Test session';
      const providerId = provider.id;
      const startTime = moment(start, 'DD/MM/YYYY hh:mm:ss', true).toDate();
      const endTime = moment(end, 'DD/MM/YYYY hh:mm:ss', true).toDate();
      const maxAttendants = 10;
      const typeId = type!.id;
      const status = ACTIVE;
      const visibility = PUBLIC;

      const data = {
        title,
        providerId,
        coachesId,
        startTime,
        endTime,
        repeat,
        maxAttendants,
        typeId,
        status,
        visibility,
      };
      const response = await gCall({
        source: mutation,
        variableValues: {
          data,
        },
        ctx: {
          userId: superadmin.id.toString(),
        },
      });
      if (response.errors) console.log(response.errors);
      expect(response.errors).not.to.exist;

      let expected = [moment(startTime).format('DD/MM/YYYY'), ...repeat.map(date => moment(date).format('DD/MM/YYYY'))];
      expected = expected.filter((value, index) => expected.indexOf(value) === index);

      const { createSessions: sessionsId } = response.data!;
      expect(sessionsId)
        .to.be.instanceOf(Array)
        .and.to.have.lengthOf(expected.length);
      const _sessions = await SessionModel.find();
      expect(_sessions)
        .to.be.instanceOf(Array)
        .and.to.have.lengthOf(expected.length);
    }

    it('create single session ', async () => await itWithParams('03/06/2019 10:00:00', '03/06/2019 10:00:00', []));

    it('create repeating sessions ', async () => {
      const start = '04/06/2019';
      const repeat: moment.Moment[] = [];
      for (let ii = 0, ll = 6; ii < ll; ii++) {
        const day = moment(start, 'DD/MM/YYYY', true)
          .startOf('day')
          .add(ii, 'day');
      }
      await itWithParams('03/06/2019 10:00:00', '03/06/2019 10:00:00', repeat.map(m => m.toDate()));
    });

    it('create repeating sessions without repeating same dates ', async () => {
      const start = '01/06/2019';
      const repeat: moment.Moment[] = [];
      for (let ii = 0, ll = 10; ii < ll; ii++) {
        const day = moment(start, 'DD/MM/YYYY', true)
          .startOf('day')
          .add(random(7), 'day');
        repeat.push(day);
      }
      await itWithParams('03/06/2019 10:00:00', '03/06/2019 10:00:00', repeat.map(m => m.toDate()));
    });
  });
});
