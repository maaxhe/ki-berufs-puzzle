#!/usr/bin/env bash
# Einmalig: Raumdienst auf dem Server einrichten (pm2 + nginx + Zertifikat für api.jobs.coxilab.de).
set -euo pipefail
K="${REMOTE_SSH_KEY:-$HOME/.ssh/biasnavigator_server}"
H=max@91.99.236.172
HERE="$(cd "$(dirname "$0")" && pwd)"
ssh -i "$K" "$H" "mkdir -p ~/berufs-raum"
scp -i "$K" "$HERE/server.mjs" "$H:~/berufs-raum/server.mjs"
ssh -i "$K" "$H" 'cd ~/berufs-raum && (pm2 restart berufs-raum --update-env || PORT=3070 DATA_FILE=/home/max/berufs-raum/raeume.json pm2 start server.mjs --name berufs-raum) && pm2 save >/dev/null
sudo tee /etc/nginx/sites-available/berufs-raum >/dev/null <<'NGINX'
server {
    listen 80;
    server_name api.jobs.coxilab.de;
    location / {
        proxy_pass http://127.0.0.1:3070;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
NGINX
sudo ln -sf /etc/nginx/sites-available/berufs-raum /etc/nginx/sites-enabled/berufs-raum
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d api.jobs.coxilab.de --non-interactive --agree-tos --redirect -m contact@maximilianherrmann.com'
sleep 2; curl -s https://api.jobs.coxilab.de/health; echo
