import { CollaboardAPI } from './api.config';

/**
 * Sockets Import
 */
import * as io from 'socket.io-client';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
 
/**
 * Sockets Code
 */
export class SocketService {
   
    private url = CollaboardAPI.socket;
    private socket;
 
    sendMessage(message) {
        this.socket.emit('echo', message);
    }
 
    getMessages() {
        let observable = new Observable(observer => {
            this.socket = io(this.url);
            this.socket.on('echo', (data) => {
                observer.next(data);
            });
 
            this.socket.on('specific', (data) => {
                observer.next(data);
            });
 
            this.socket.on('dev', (data) => {
                observer.next(data);
            });
 
            return () => {
                this.socket.disconnect();
            };
        })
        return observable;
    }
 
    joinRoom(roomId) {
        this.socket.emit('join room', roomId);
    }
 
    listRooms() {
        this.socket.emit('list rooms');
    }
 
    sendSpecific(roomId, message) {
        this.socket.emit('send specific', message, roomId);
    }
}