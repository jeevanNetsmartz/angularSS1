import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  messageText: string = '';
  messages: Array<any> = [];
  socket: any;
  @ViewChild('myCanvas')
  myCanvas: ElementRef<HTMLCanvasElement>;
  public context: CanvasRenderingContext2D;

  constructor() {
    this.socket = io.connect('http://localhost:8080', { transports : ['websocket'] });
    // this.socket = io.connect();
  }

  ngOnInit() {
    // this.context = this.myCanvas.nativeElement.getContext('2d');
    this.socket.on('connect', function () {
      console.log("socket connected to http://localhost:8080");
    });

    this.socket.emit('canvas', function () {
      
    });

    //read video stream
    this.socket.on('canvas', function (data: any) {
      console.log(data);
      // try {
      //   var canvas = document.getElementById('videostream') as HTMLCanvasElement;
      //   var context = canvas.getContext('2d');
      //   var imageObj = new Image();
      //   imageObj.src = "data:image/jpeg;base64," + data;
      //   imageObj.onload = function () {
      //     context.height = imageObj.height;
      //     context.width = imageObj.width;
      //     context.drawImage(imageObj, 0, 0, context.width, context.height);
      //   }
      // } catch (e) { }
    });

    this.socket.on('disconnect', function (exception: any) {
      console.log("socket disconnect");
      //this.disconnect(true);
      //this.destroy();
    });

  }

}
