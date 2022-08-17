export function escolheAmbiente (ambiente: String) {
  if (ambiente === 'prod') return 'prod'
  else if (ambiente === 'development') return 'server/app/env/dev/.env'
  else if (ambiente === 'test') return 'server/app/env/test/.env'
}