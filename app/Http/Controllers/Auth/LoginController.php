<?php

namespace App\Http\Controllers\Auth;

use App\AccountLog;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
    /**
     * Login Social
     */
    public function redirectToLoginProvider($provider){
        return Socialite::driver($provider)->redirect();
    }

    public function handleCallbackProvider($provider){
        try{
            $user = Socialite::driver($provider)->user();
            $this->registerOrLoginByProvider($user, $provider);
            return redirect('/home');
        }catch (\Exception $ex){
            throw $ex;
        }
    }

    public function registerOrLoginByProvider($data, $provider)
    {
        $user = User::where('email', '=', $data->email)->first();

        if (!$user) {
            $user = new User();
            $user->name = $data->name;
            $user->email = $data->email;
            $user->provider = $provider;
            $user->provider_id = $data->id;
            $user->save();
        }

        Auth::login($user);
    }
    /**
     * Validate the user login request.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return void
     */
    public function validateLogin($request)
    {
        $rules = [
            $this->username() => 'required|email',
            'password'        => 'required|string|min:6',
        ];

        if(config('captcha.enabled')) {
            $rules['h-captcha-response'] = 'required|captcha';
        }
        
        $this->validate($request, $rules);
    }

    /**
     * The user has been authenticated.
     *
     * @param \Illuminate\Http\Request $request
     * @param mixed                    $user
     *
     * @return mixed
     */
    protected function authenticated($request, $user)
    {
        if($user->status == 'deleted') {
            return;
        }

        $log = new AccountLog();
        $log->user_id = $user->id;
        $log->item_id = $user->id;
        $log->item_type = 'App\User';
        $log->action = 'auth.login';
        $log->message = 'Account Login';
        $log->link = null;
        $log->ip_address = $request->ip();
        $log->user_agent = $request->userAgent();
        $log->save();
    }
}
