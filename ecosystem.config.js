module.exports = {
    apps: [{
      script: 'npm start'
    }],
  
    deploy: {
      production: {
        key: 'key.pem',
        user: 'ubuntu',
        host: '13.233.217.229',
        ref: 'origin/main',
        repo: 'GIT_REPOSITORY',
        path: '/home/wastik/',
        'pre-deploy-local': '',
        'post-deploy': 'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
        'pre-setup': '',
        'ssh_options': 'ForwardAgent=yes'
      }
    }
  };