module "istio" {
  source = "../../modules/istio"

  gateways = {
    "app-s42" = {
      ingressSelectorName = "ingressgateway"
      namespace           = "production"
      serverHttpsRedirect = true
      hosts               = ["s42.app"]
      tlsMode             = "SIMPLE"
      tlsCredentialName   = "app-s42-tls"
    },
    "app-s42-next" = {
      ingressSelectorName = "ingressgateway"
      namespace           = "staging"
      serverHttpsRedirect = true
      hosts               = ["next.s42.app", "*.next.s42.app"]
      tlsMode             = "SIMPLE"
      tlsCredentialName   = "app-s42-next-tls"
    },
    "dev-s42" = {
      ingressSelectorName = "ingressgateway"
      namespace           = "sandbox"
      serverHttpsRedirect = true
      hosts               = ["s42.dev", "*.s42.dev", "*.sandbox.s42.dev"]
      tlsMode             = "SIMPLE"
      tlsCredentialName   = "dev-s42-tls"
      extraServers = [
        {
          port = {
            number   = 51000
            name     = "grpc"
            protocol = "GRPC"
          }
          hosts = ["sandbox.s42.dev"]
        }
      ]
    }
    "dev-s42-previews" = {
      ingressSelectorName = "ingressgateway"
      namespace           = "previews"
      serverHttpsRedirect = true
      hosts               = ["*.previews.s42.dev"]
      tlsMode             = "SIMPLE"
      tlsCredentialName   = "dev-s42-previews-tls"
    }

    "be-zboub" = {
      ingressSelectorName = "ingressgateway"
      namespace           = "production"
      serverHttpsRedirect = true
      hosts               = ["zbou.be"]
      tlsMode             = "SIMPLE"
      tlsCredentialName   = "be-zboub-tls"
    }
  }
}
