export default class Socket<CommandType> {
  socket: WebSocket | null;

  constructor() {
    this.socket = null;
  }

  connect(url: string) {
    this.socket = new WebSocket(url);
  }

  disconnect() {
    try {
      this.socket?.close();
      console.log('close');
    } catch {
      console.log('error');
    }
  }

  send(command: CommandType) {
    this.socket?.send(JSON.stringify(command));
  }

  onOpen(listener: (evt: Event) => void) {
    this.socket?.addEventListener('open', listener);
  }

  onMessage(listener: (evt: MessageEvent<CommandType>) => void) {
    this.socket?.addEventListener('message', listener);
  }

  onError(listener: (evt: Event) => void) {
    this.socket?.addEventListener('error', listener);
  }

  onClose(listener: (evt: CloseEvent) => void) {
    this.socket?.addEventListener('close', listener);
  }
}
