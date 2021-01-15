# Disttributed Town Front-end

Live at <https://distributed.town/>

To learn more about the distributed town project, visit <https://github.com/DistributedTown/about>

## Repos

- [**Smart Contracts**](https://github.com/DistributedTown/distributed-town-smart-contracts)
- [**RSK Smart Contracts**](https://github.com/DistributedTown/distributed-town-rsk-smart-contracts)
- [**Backend**](https://github.com/DistributedTown/distributed-town-backend)
- [**Frontend**](https://github.com/DistributedTown/distributed-town-frontend)
- [**RSK Frontend**](https://github.com/DistributedTown/distributed-town-rsk-frontend)

## VM Setup

- To start a PM2 process `pm2 start npm --name "frontend-name" -- start`
- To setup subdomain
  - add A record in namecheap
  - setup reverse proxy by editing /etc/caddy/Caddyfile then running 'sudo caddy reload' in the same directory.
- To setup startup script in a new VM run `pm2 startup` and follow instructions.
- To update the startup script with newly added processes run `pm2 freeze`
