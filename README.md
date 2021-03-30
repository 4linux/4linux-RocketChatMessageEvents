# 4linux-MessageEvents

[Rocket.Chat app](https://docs.rocket.chat/apps-development/getting-started) que possibilita limitar ações em mensagens dentro de uma conversa de livechat.

Atualmente suportando as seguintes limitações:
* Bloquear citação de mensagens
* Bloquear edição de mensagens
* Bloquear exclusão de mensagens

Todas limitações podem ser habilitadas/desabilitadas a partir das configurações do aplicativo.

## Instalação

Para instalar o aplicativo no seu Rocket.Chat é necessário:
* Git
* Node
* [Rocket.Chat App Engine CLI](https://docs.rocket.chat/apps-development/getting-started/rocket.chat-app-engine-cli)

### Instalando no Rocket.Chat

1. Clone o repositório e acesse a pasta de destino:
```bash
git clone https://github.com/4linux/4linux-RocketChatMessageEvents.git
cd 4linux-RocketChatMessageEvents
```

2. Instale as depências do projeto:
```bash
npm install
```

3. Efetue o deploy do aplicativo:
```bash
rc-apps deploy --url <endereco-rocketchat> --username <usuario-admin> --password <senha-admin>
```
***Obs:*** Para funcionar o deploy, garanta que em seu Rocket.Chat está habilitado o uso de Apps e o modo de desenvolvimento, em: `Administração` > `Geral` > `Apps` habilite as opções: `Ativar o App Framework` e `Habilitar modo de desenvolvimento`.

Em caso de atualização de versão, utilize o mesmo comando de deploy adicionado `--update` ao final.
