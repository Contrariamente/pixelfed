<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <meta name="mobile-web-app-capable" content="yes">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <meta property="og:site_name" content="{{ config('app.name', 'pixelfed') }}">
    <meta property="og:title" content="{{ config('app.name', 'pixelfed') }}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="{{request()->url()}}">
    <meta property="og:description" content="Federated Image Sharing">

    <meta name="medium" content="image">
    <meta name="theme-color" content="#10c5f8">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="shortcut icon" type="image/png" href="/img/favicon.png?v=2">
    <link rel="apple-touch-icon" type="image/png" href="/img/favicon.png?v=2">
    <link href="{{ mix('css/landing.css') }}" rel="stylesheet">
    <style type="text/css">
        .feature-circle {
            display: flex !important;
            -webkit-box-pack: center !important;
            justify-content: center !important;
            -webkit-box-align: center !important;
            align-items: center !important;
            margin-right: 1rem !important;
            background-color: #08d !important;
            color: #fff;
            border-radius: 50% !important;
            width: 60px;
            height: 60px;
        }

        .section-spacer {
            height: 13vh;
        }
    </style>
</head>

<body class="">
    <main id="content">
        <section class="container">
            <div class="section-spacer"></div>
            <div class="row pt-md-5 mt-5" id="div-total">
                <div class="col-12 col-md-6 d-none d-md-block">

                </div>
                <div class="col-12 col-md-5 offset-md-1">
                    <div>

                        <div class="m-my-4" id="text-primary-form">
                            <p class="display-2 font-weight-bold" id="title-portal">UM NOVO PORTAL SE ABRE</p>
                            <p class="sub-text-form">Conecte-se com outros profissionais, compartilhe suas técnicas
                                e encontre novas oportunidades de trabalho. Contrariamente é uma plataforma completa
                                para profissionais e empresários da área da beleza e estética.</p>
                        </div>
                        <div class="d-block d-md-none">
                            <p class="font-weight-bold mb-0 text-center">Photo Sharing. For Everyone</p>
                        </div>
                        <div class="card my-4 shadow-none border" id="card-form-login">
                            <div class="card-body px-lg-5">

                                <div>
                                    <form class="px-1" method="POST" action="{{ route('login') }}" id="login_form">
                                        @csrf
                                        <div class="form-group row">

                                            <div class="col-md-12">
                                                <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" placeholder="{{__('Email')}}" required autofocus>

                                                @if ($errors->has('email'))
                                                <span class="invalid-feedback">
                                                    <strong>{{ $errors->first('email') }}</strong>
                                                </span>
                                                @endif
                                            </div>
                                        </div>

                                        <div class="form-group row">

                                            <div class="col-md-12">
                                                <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" placeholder="{{__('Senha')}}" required>

                                                @if ($errors->has('password'))
                                                <span class="invalid-feedback">
                                                    <strong>{{ $errors->first('password') }}</strong>
                                                </span>
                                                @endif
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <div class="col-md-12">
                                                <div class="checkbox">
                                                    <label>
                                                        <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}>
                                                        <span class="font-weight-bold small ml-1 text-muted">
                                                            {{ __('Lembrar') }}
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>


                                        </div>
                                        @if(config('captcha.enabled'))
                                        <div class="d-flex justify-content-center mb-3">
                                            {!! Captcha::display() !!}
                                        </div>
                                        @endif
                                        <div class="form-group row mb-0">
                                            <div class="col-md-12">
                                                <button type="submit" class="btn btn-primary btn-block py-0 font-weight-bold text-uppercase" id="btn-login">
                                                    {{ __('Login') }}
                                                </button>
                                            </div>
                                            <div class="card shadow-none border card-body" id="card-form-login">
                                                <p class="text-center mb-0 font-weight-bold small">
                                                    @if(config('pixelfed.open_registration'))
                                                    <a href="/register">{{ __('Cadastre-se') }}</a>
                                                    <span class="px-1">/</span>
                                                    @endif
                                                    <a href="/password/reset">{{ __('Esqueci minha senha') }}</a>
                                                </p>
                                            </div>
                                            <div class="pt-md-3 d-flex justify-content-center align-items-center" id="logoandtext-contra">
                                                <img src="/img/pixelfed-icon-color.svg" loading="lazy" width="30px" height="50px">
                                                <span class="font-weight-bold h3 ml-2 pt-2" style="color: #6a1ae8;">Contrariamente</span>
                                            </div>
                                        </div>
                                </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    </main>

</body>

</html>
