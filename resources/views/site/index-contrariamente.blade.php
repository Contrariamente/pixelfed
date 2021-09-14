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

<body>
    <main id="content">
<section class="container-1">
        <section class="container container-geral">
            <div class="section-spacer section-espaco-top"></div>
            <div class="row pt-md-5 mt-5" id="div-total">
                <div class="col-12 col-md-6 d-none d-md-block">
              
                </div>
                <div class="col-12 col-md-5 offset-md-1" id="backgroud-login">
                    <div>
                    <div class="pt-md-3 d-flex justify-content-center align-items-center" id="logoandtext-contra">
                                                <img src="/img/pixelfed-icon-color.svg" loading="lazy" width="30px" height="50px">
                                                <span class="font-weight-bold h3 ml-2 pt-2" style="color: #6a1ae8;">Contrariamente</span>
                                            </div>
                        <div class="m-my-4" id="text-primary-form">
                            <p class="display-2 font-weight-bold title-portal">UM NOVO PORTAL SE ABRE</p>
                            <p class="sub-text-form">Conecte-se com outros profissionais, compartilhe suas técnicas
                                e encontre novas oportunidades de trabalho. Contrariamente é uma plataforma completa
                                para profissionais e empresários da área da beleza e estética.</p>
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
                                           
                                        </div>
                                </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
        </section>



        <section class="container-03">
        <section class="container" id="container-total03">
      
        <div class="row pt-md-5 mt-5" id="div-total">
                <div class="col-12 col-md-6 d-md-block">
                <div class="section-03-l01">
                <h1>
             CONECTE-SE<br>
             <b>COMPARTILHE</b><br>
             CRESÇA <img src="/img/pixelfed-icon-color.svg" loading="lazy" width="30px" height="50px">
             </h1>
             <p>
             barba <br>
             cabelo <br>
             estética <br>
             maquiagem <br>
             sobrancelha <br>
             </p>
                </div>

             
                </div>
                <div class="col-12 col-md-6 offset-md-1 feedback-top">
                  <div class="feedback-one">
                  <div class="titulo-name">
                  <p>Bárbara Koch</p>
                  <span>Software Engineering Coordinator</span>
                  </div>
                  <div class="text-depoimento">
                      <p>
                      "Depois que eu entrei na Contrariamente a minha vida mudou mil vezes p/ melhor.
                  Aqui tive a oportunidade de contratar pessoas super talentosas.
                     A usabilidade é ótima e com um design incrivel,
                     não trocaria por nenhuma rede a nossa roxinha rs."
                      </p>
                  
                  </div>
                  </div>
                  <img src="/img/barbara.jpg" loading="lazy"  id="img-depoimento">
                    </div>
                </div>
            </div>
            
           <div class="">
                <div class="feedback-two">
                <img src="/img/alexandre.jpg" loading="lazy"  id="img-depoimento-02">
                <div class="text-depoimento-bottom">
                <p>O contrariamente me ajudou demais a encontrar novos trabalhos através das conexãoes,
                acho que nos dias de hoje com tudo muito virtual essa rede apostou muito e ganhou!
                </p>
                 <div class="titulo-name-two">
                  <p>Alexadre Merello</p>
                  <span>Business Intelligence Analyst</span>
                  </div>
                </div>
               </div>
               <div class="col-12 col-md-6 offset-md-1" id="section-proposito">
                  <div class="nova-forma-div">
                  <img src="/img/forma-a.png" loading="lazy"  id="forma-a">
                  <p class="a-suarede">
                    a sua rede social<br> da área da beleza<br> e estética</p>
                  <p class="umanovaforma">uma nova forma de<br> compartilhar e<br> mostrar o seu trabalho</p>
            </div>

            <div class="nova-oportunidade">
            <h1>UMA NOVA<br>OPORTUNIDADE<br>COMEÇA AQUI</h1>
            
              <button type="submit" class="btn btn-primary btn-block py-0 font-weight-bold text-uppercase" id="btn-cadastro">
                Cadastre-se
                </button>
             
            </div>
         
        </section>
     
        </section>
        <div class="img-logo-photo">
            <img src="/img/foto-bglogo.png" loading="lazy"  id="foto-bg">
            </div>
    </main>
    <footer>
        <section class="logo-footer">
        <img src="/img/logocontra-white.png" loading="lazy"  id="">
        </section>
        <ul>
            <li><a href="">Cadastre-se</a></li>
            <li><a>Central de Ajuda</a></li>
            <li><a>Artigos</a></li>
            <li><a>Newsletter</a></li>
        </ul>

        <ul>
            <li><a>Trabalhe Conosco</a></li>
            <li><a>Vendas</a></li>
            <li><a>Seja um parceiro</a></li>
            <li><a>Termos e Serviços</a></li>
        </ul>
        <section class="infos-contra">
            <p>
                2021 <b>Contrariamente</b><br>
                @contrariamente<br>
                contato@contrariamente.com
            </p>
        </section>

    </footer>



</body>

</html>
