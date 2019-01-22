'use strict';

describe('logic', function () {
    describe('login', function (){
        
    it('should succeed on correct credentials', function () {
            var expected = users.find(function (user) { return user.email === 'johndoe@mail.com'; });

            // busquem tot el user si hi ha algun q johndoe, q serà el expected (sense password)
       
            var loggedInUser;


            login(expected.email, expected.password, function (user) {
                loggedInUser = user;
                 // farem el testing sense el paswword, pq es info personal.
            });

            expect(loggedInUser).toBeDefined();
            expect(loggedInUser.name).toEqual(expected.name);
            expect(loggedInUser.surname).toEqual(expected.surname);
            expect(loggedInUser.email).toEqual(expected.email);
            expect(loggedInUser.password).toBeUndefined();
            expect(loggedInUser).not.toEqual(expected);
        });

        //users es un objecte, x aixo fem expected.email 

        it('should fail on wrong email', function () {
            var inventedEmail = 'invented@mail.com';

            // var error;

            // try {
            //     login(inventedEmail, '123', function() {});
            // } catch(err) {
            //     error = err;
            // }

            // expect(error).toBeDefined();
            // expect(error.message).toBe('user ' + inventedEmail + ' not found');

            // ALT jasmine

            expect(function () {  //els error s'ahn de tancar dins de funcins, sino jasmine peta. 
                login(inventedEmail, '123', function () { }); //la function() no te res, es pq hem de posar un callback
            }).toThrow(Error('user ' + inventedEmail + ' not found'));
        });


        it('should fail on wrong password', function () {
            expect(function () {
                login('johndoe@mail.com', '123', function () { });
            }).toThrow(Error('wrong password'));
        });
    

    ///////////////////////////////////////////////////////  LOGIN EMAIL ////// 
    
        it('should fail on login email undefined', function () {
            var  loggedInUser;

        
            var email = undefined;

            expect(function () {
                login(email, "123", function () {
                    loggedInUser = true;
                });
            }).toThrow(TypeError(email + ' is not a string'));

            expect(loggedInUser).toBeUndefined();
        });

        // no cal posar el password, pq salta l'error abans d'arribar al password.

        it('should fail on logic email number', function () {
            var  loggedInUser;

        
            var email = 990088;
           

            expect(function () {
                login(email, "123", function () {
                    loggedInUser = true;
                });
            }).toThrow(TypeError(email + ' is not a string'));

            expect(loggedInUser).toBeUndefined();
        });


        it('should fail on logic email boolean', function () {
            var  loggedInUser;

        
            var email = false;
           

            expect(function () {
                login(email, "123", function () {
                    loggedInUser = true;
                });
            }).toThrow(TypeError(email + ' is not a string'));

            expect(loggedInUser).toBeUndefined();
        });


        it('should fail on logic email object', function () {
            var  loggedInUser;
        
            var email = {};
           

            expect(function () {
                login(email, "123", function () {
                    loggedInUser = true;
                });
            }).toThrow(TypeError(email + ' is not a string'));

            expect(loggedInUser).toBeUndefined();
        });

        it('should fail on logic email array', function () {
            var  loggedInUser;
        
            var email = [];
           

            expect(function () {
                login(email, "123", function () {
                    loggedInUser = true;
                });
            }).toThrow(TypeError(email + ' is not a string'));

            expect(loggedInUser).toBeUndefined();
        });

        it('should fail on logic empty email ', function () {
            var  loggedInUser;
        
            var email = "";
           
            expect(function () {
                login(email, "123", function () {
                    loggedInUser = true;
                });
            }).toThrow(Error('email cannot be empty'));

            expect(loggedInUser).toBeUndefined();
        });

    ////////////////////////////////////////////// Log in password /////////////

    
    it('should fail on login password undefined', function () {
        var  loggedInUser;

    
        var email = 'jw@mail.com';
        var password = undefined;

        expect(function () {
            login(email, password, function () {
                loggedInUser = true;
            });
        }).toThrow(TypeError(password + ' is not a string'));

        expect(loggedInUser).toBeUndefined();
    });


    it('should fail on logic password number', function () {
        var  loggedInUser;

    
        var email = 'jw@mail.com';
        var password = 1234;

        expect(function () {
            login(email, password, function () {
                loggedInUser = true;
            });
        }).toThrow(TypeError(password + ' is not a string'));

        expect(loggedInUser).toBeUndefined();
    });

    it('should fail on logic password boolean', function () {
        var  loggedInUser;

    
        var email = 'jw@mail.com';
        var password = true;

        expect(function () {
            login(email, password, function () {
                loggedInUser = true;
            });
        }).toThrow(TypeError(password + ' is not a string'));

        expect(loggedInUser).toBeUndefined();
    });

    it('should fail on logic password object', function () {
        var  loggedInUser;

    
        var email = 'jw@mail.com';
        var password = {};

        expect(function () {
            login(email, password, function () {
                loggedInUser = true;
            });
        }).toThrow(TypeError(password + ' is not a string'));

        expect(loggedInUser).toBeUndefined();
    });

     it('should fail on logic password array', function () {
        var  loggedInUser;

    
        var email = 'jw@mail.com';
        var password = [];

        expect(function () {
            login(email, password, function () {
                loggedInUser = true;
            });
        }).toThrow(TypeError(password + ' is not a string'));

        expect(loggedInUser).toBeUndefined();
    });


    it('should fail on logic empty password ', function () {
        var  loggedInUser;

    
        var email = 'jw@mail.com';
        var password = "";

        expect(function () {
            login(email, password, function () {
                loggedInUser = true;
            });
        }).toThrow(Error("password cannot be empty"));

        expect(loggedInUser).toBeUndefined();
    });


    /////////////////////////////////   REGISTER  ////////////////
});

    describe('register', function () {
        var registeringEmail = 'jw@mail.com';

        beforeEach(function () {
            var userIndex = users.findIndex(function (user) { return user.email === registeringEmail; });

            if (userIndex > -1) //-1 vol dia q l'usuari no existeix
                users.splice(userIndex, 1); //si no existeix, l'esborra
        });

        it('should succeed on valid data', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';

            register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                registered = true;
            });

            expect(registered).toBeTruthy();

            var registeredUser = users.find(function (user) { return user.email === registeringEmail; });

            expect(registeredUser).toBeDefined();
            expect(registeredUser.email).toEqual(registeringEmail);
            expect(registeredUser.name).toEqual(registeringName);
            expect(registeredUser.surname).toEqual(registeringSurname);
            expect(registeredUser.password).toEqual(registeringPassword);
        });
//////////////////////////////////////////////////////////////////// name
        it('should fail on undefined name', function () {
            var registered;

            var registeringName = undefined;
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringName + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on numeric name', function () {
            var registered;

            var registeringName = 10;
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringName + ' is not a string'));

            expect(registered).toBeUndefined();
        });


        it('should fail on boolean name', function () {
            var registered;

            var registeringName = true;
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringName + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on object name', function () {
            var registered;

            var registeringName = {};
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringName + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on array name', function () {
            var registered;

            var registeringName = [];
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringName + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on empty name', function () {
            var registered;

            var registeringName = '';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(Error('name cannot be empty'));

            expect(registered).toBeUndefined();
        });
//////////////////////////////////////////////////////////////////// surname
        it('should fail on undefined surname', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = undefined;
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringSurname + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on numeric surname', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = 10;
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringSurname + ' is not a string'));

            expect(registered).toBeUndefined();
        });


        it('should fail on boolean surname', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = false;
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringSurname + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on object surname', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = {};
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringSurname + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on array surname', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = [];
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringSurname + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on empty surname', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = '';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(Error('surname cannot be empty'));

            expect(registered).toBeUndefined();
        });
////////////////////////////////////////////////////////////password
        it('should fail on undefined email', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = undefined;
            var registeringPassword ='p4ssw0rd';

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringEmail + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on numeric email', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 900;
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringEmail + ' is not a string'));

            expect(registered).toBeUndefined();
        });


        it('should fail on boolean password', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = true;
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringEmail + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on object password', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = {};
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringEmail + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on array email', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = [];
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringEmail + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on empty email', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = "";
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(Error('email cannot be empty'));

            expect(registered).toBeUndefined();
        });


// ////////////////////////////////////////////////////////////password
        it('should fail on undefined password', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = undefined;

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringPassword + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on numeric password', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 8989;

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringPassword + ' is not a string'));

            expect(registered).toBeUndefined();
        });


        it('should fail on boolean password', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = false;

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringPassword + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on object password', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = {};

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringPassword + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on array password', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = [];

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringPassword + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on empty password', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = "";

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(Error('password cannot be empty'));

            expect(registered).toBeUndefined();
        });

//--------------------------------------------

    });
});



