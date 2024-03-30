# Installing 

1. `npm i`
2. `cp .env.template .env.development`
3. `cp .env.template .env.production`
4. Fill in sensitive config variables in newly created environment files.

# Running App
### Development Environment
1. `npm run start`

### Production
1. `npm run build`
2. `serve -s build --listen 3000 --ssl-cert "/file/path/fullchain.pem" --ssl-key "/file/path/privkey.pem"`