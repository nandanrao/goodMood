describe('Ctrl: Login', function(){

  var LoginCtrl,
      Auth,
      User,
      $rootScope,
      $q,
      $window,
      $log,
      $state,
      $scope

  beforeEach(function(){

    module('goodMood')
    module('fbMock');
    module('stateMock');
    module('authMock');
  })

  beforeEach(inject(function ($controller, _$q_, _$rootScope_, _$state_){
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $state = _$state_;
    $window = {
      alert: sinon.spy()
    }
    $log = {
      error: sinon.spy(),
      debug: sinon.spy()
    }
    $q = _$q_;
    Auth = {
      viaOAuth: sinon.stub().returns($q(function(resolve, reject){
        resolve({
          google: {
            displayName: 'name'
          }
        })
      }))
    }

    User = {
      create: sinon.stub().returns($q.when()),
      findByAuth: sinon.stub().returns($q.when())
    }

    LoginCtrl = $controller('LoginCtrl', {
      Auth: Auth,
      User: User,
      $window: $window,
      $log: $log,
      $scope: $scope
    })

  }))

  describe(':: authLogin', function(){

    it('it creates a user if one doesnt already exist', function(){
      LoginCtrl.authLogin('google')
      Auth.viaOAuth.should.have.been.calledWith('google')
      $state.expectTransitionTo('home')
      $rootScope.$apply()
      User.create.should.have.been.called
    })

    it('does not create a user if one exists', function(){
      User.findByAuth.returns($q.when('user'))
      LoginCtrl.authLogin('google')
      $state.expectTransitionTo('home')
      $rootScope.$apply()
      User.create.should.not.have.been.called
    })

    it('catches errors and throws an alert + logs an error', function(){
      Auth.viaOAuth.returns(
        $q.reject('crazy rror!')
      )
      LoginCtrl.authLogin.bind(this, 'blah').should.not.Throw()
      $rootScope.$apply()
      $window.alert.should.have.been.called
      $log.error.should.have.been.called
    })
  })

})