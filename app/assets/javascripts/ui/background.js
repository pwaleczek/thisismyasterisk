/*
  @file: background.js
  
  Copyright (c) 2013 Pawel Waleczek [pawel@thisismyasterisk.org], All rights reserved.

  THE SOFTWARE AND DOCUMENTATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF
  ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR
  PURPOSE.

  Please see the license.txt file for more information.
*/

define(['utils'], function(Utils) {
    var Background = function(clearColor) {
      console.log('init!');
      this.textsScale = {x: 1, y: 1};
      this.textsInterval;
      this.fadeInTexts = false;
      this.fadeOutTexts = false;
      this.textsOpacity = 0;
      this.textsIndex = 0;
      this.textsArray = [
        ['   __  __    _      _                                 __            _      __                        ',
         '  / /_/ /_  (_)____(_)________ ___  __  ______ ______/ /____  _____(_)____/ /__     ____  _________ _',
         ' / __/ __ \\/ / ___/ / ___/ __ `__ \\/ / / / __ `/ ___/ __/ _ \\/ ___/ / ___/ //_/    / __ \\/ ___/ __ `/',
         '/ /_/ / / / (__  ) (__  ) / / / / / /_/ / /_/ (__  ) /_/  __/ /  / (__  ) ,<   _  / /_/ / /  / /_/ / ',
         '\\__/_/ /_/_/____/_/____/_/ /_/ /_/\\__, /\\__,_/____/\\__/\\___/_/  /_/____/_/|_| (_) \\____/_/   \\__, /  ',
         '                                 /____/                                                     /____/   '
        ],
        ['                          __          __            ',
         '    ____ _________  ___  / /______   / /_____     _ ',
         '   / __ `/ ___/ _ \\/ _ \\/ __/ ___/  / __/ __ \\   (_)',
         '   / /_/ / /  /  __/  __/ /_(__  )  / /_/ /_/ /  _    ',
         '\\__, /_/   \\___/\\___/\\__/____/   \\__/\\____/  (_)',
         ' /____/                                             '
        ],
        ['    ____                                  ',
         '   / __ \\___  ____  ____  ____  ___  _____',
         '  / /_/ / _ \\/_  / / __ \\/ __ \\/ _ \\/ ___/',
         ' / _, _/  __/ / /_/ /_/ / / / /  __/ /    ',
         '/_/ |_|\\___/ /___/\\____/_/ /_/\\___/_/     '
        ],
        ['    __                 __',
         '   / /______ ___  ____/ /',
         '  / //_/ __ `__ \\/ __  / ',
         ' / ,< / / / / / / /_/ /  ',
         '/_/|_/_/ /_/ /_/\\__,_/   '
        ],
        // ['    ___    __ __ ___       ______  ___ ',
        //  '   /   |  / //_//   |     / / __ \\/   |',
        //  '  / /| | / ,<  / /| |__  / / / / / /| |',
        //  ' / ___ |/ /| |/ ___ / /_/ / /_/ / ___ |',
        //  '/_/  |_/_/ |_/_/  |_\\____/_____/_/  |_|'
        // ],
        ['        _            __    ',
         '  _____(_)__  ____  / /___ ',
         ' / ___/ / _ \\/ __` / / __ \\',
         '/ /__/ /  __/ /_/ / / /_/ /',
         '\\___/_/\\___/ .___/_/\\____/ ',
         '          /_/             '
        ],
        ['','','',
         ' ____________________________________',
         '/___________________________________/'
        ]
      ];

      this.clearColor = clearColor || '#000000';
      this.clearCanvas = false;
      this.offset = {
        x: 0,
        y: 0
      }

      this.lineWidth = 4;
      this.staticBuffer = cq(window.innerWidth * 2, window.innerHeight * 2);
      
      this.shape1 = new this.shapeCanvas('rgb(232, 23, 93)');
      this.shape2 = new this.shapeCanvas('rgb(238, 238, 238)');
      this.shape3 = new this.shapeCanvas('rgb(54, 54, 54)');

      for(var i = 0; i < (Math.random() * 10 + 6) | 0; i++) {

        this.staticBuffer.drawImage(this.shape1.cw.canvas, Math.random() * window.innerWidth, Math.random() * window.innerHeight);
        this.staticBuffer.drawImage(this.shape2.cw.canvas, Math.random() * window.innerWidth, Math.random() * window.innerHeight);
        this.staticBuffer.drawImage(this.shape3.cw.canvas, Math.random() * window.innerWidth, Math.random() * window.innerHeight);
      }

      /* 
        This  is part of the CODEF project.
        More info : http://codef.santo.fr

        Code is modified to be standalone / work with canvas query
      */
      this.test=true;
      this.n = 1000;
      this.star = new Array(this.n);
      this.w = window.innerWidth;
      this.h = window.innerHeight;
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.offsetx = 0;
      this.offsety = 0;
      this.centx = this.w/2;
      this.centy = this.h/2;
      this.color = '#c8b57f';
      this.star_x_save,this.star_y_save;
      this.star_speed = 1;
      this.star_ratio = 100;
      this.star_color_ratio = 1;
      this.x = Math.round(this.w/2);
      this.y = Math.round(this.h/2);
      this.z = (this.w+this.h)/4;
      this.star_color_ratio = 1/this.z;
      this.cursor_x = this.x;
      this.cursor_y = this.y;

      for(var i=0;i<this.n;i++){
        this.star[i]=new Array(5);
        this.star[i][0]=Math.random()*this.w*2-this.x;
        this.star[i][1]=Math.random()*this.h*2-this.y;
        this.star[i][2]=Math.round(Math.random()*this.z);
        this.star[i][3]=0;
        this.star[i][4]=0;
      }

      // CODEF end

      console.log(this);
      
      this.buffer = cq(window.innerWidth, window.innerHeight);
      
    }

    Background.prototype = {
      shapeCanvas: function(color) {
        var SHAPE_W = 300,
            SHAPE_H = 300;

        this.cw = cq(SHAPE_W, SHAPE_H)
          .clear()
          .strokeStyle(color)
          .fillStyle(color)
          .lineWidth(this.linkeWidth)
          .lineJoin('round')
          .beginPath()
          .moveTo(Math.random() * SHAPE_W, Math.random() * SHAPE_H);
        for(var i = 0; i < (Math.random() * 20 + 3) | 0; i++){
          this.cw.lineTo(Math.random() * SHAPE_W, Math.random() * SHAPE_H);
        }
        this.cw.fill()
          .stroke();


        
        //return {cw: cw, offset: { x: 0, y: 0}};
      },

      switchClear: function(color, mono) {
        
        _.extend(this, {})

        var page = UI.CurrentPage;

        UI.renderCanvas.shiftHsl(1, null, null);
      },

      getPixels: function(image) {
        // if(instanceof image !== 'Image') {
        //  return flse;
        // }



        return this;
      },

      run: function() {
        this.renderCanvas = cq(document.getElementById('background'));
        this.renderCanvas.canvas.width = this.buffer.width = window.innerWidth;
        this.renderCanvas.canvas.height = this.buffer.height = window.innerHeight;

        var _this = this;
        if(!UI.isHandheld || /Chrome|Chromium/i.test(navigator.userAgent)) {
        
          this.renderCanvas.onRender(function (delta) {
            _this.render(_this.buffer, delta);
          }).onStep(function (delta, time) {
            _this.step(delta, time);
          });
        }
        $(window).on('resize', this.resize);
        //$('canvas#background').fadeIn(UI.speed);
        
        // setTimeout(function() {
        //   _this.fadeInTexts = true;
        //   _this.textsOpacity = 0;
        //   _this.textsIndex = 0;
        // }, 250);


        this.moveDirectionChangeInterval = setInterval(function() {
          _this.moveDirection = Math.random();
        }, 3000);
        _this.moveDirection = Math.random();
      },

      step: function(delta, time) {
        if(UI.CurrentPage === 'asterisk') {
          // for(var i=0;i<this.n;i++){
          if(this.fadeOutTexts) {   
            this.textsOpacity -= 0.0075;
            if(this.textsOpacity <= 0) {
              this.textsOpacity = 0;
              this.textsScale.x = 0.5;
              this.textsScale.y = 0.5;
              this.fadeOutTexts = false;
              this.textsIndex++;
              if(this.textsIndex > this.textsArray.length - 1) {
                this.textsIndex = 0;
              }
              var _this = this;
              setTimeout(function() { if(UI.CurrentPage === 'asterisk') _this.fadeInTexts = true; }, 250);
            }
          }
          if(this.fadeInTexts) {
            this.textsOpacity += 0.0075;
            if(this.textsOpacity >= 1){
              this.textsOpacity = 1;
              this.fadeInTexts = false;
              
              var _this = this;
              setTimeout(function() { if(UI.CurrentPage === 'asterisk') _this.fadeOutTexts = true; }, 1500);
            }
          }
          // }
        } else {
          if(this.moveDirection < 0.25) {
            this.offset.x += Math.random() * 0.01;
            this.offset.y += Math.random() * 0.02;
          } else if(this.moveDirection < 0.5 && this.moveDirection > 0.25) {
            this.offset.x -= Math.random() * 0.02;
            this.offset.y -= Math.random() * 0.01;
          } else if(this.moveDirection < 0.75 && this.moveDirection > 0.5) {
            this.offset.x += Math.random() * 0.02;
            this.offset.y -= Math.random() * 0.01;
          } else if(this.moveDirection < 1 && this.moveDirection > 0.75) {
            this.offset.x -= Math.random() * 0.01;
            this.offset.y += Math.random() * 0.02;
          }
          if(this.offset.x > window.innerWidth * 2/3)
            this.offset.x = 0;

          if (this.offset.y > window.innerHeight * 2/3)
            this.offset.y = 0;
        }
      },

      render: function(ctx, delta) {
        
        ctx.save();       

        if(UI.CurrentPage === 'asterisk') {
          ctx.clear(this.clearColor);

          //starfield

          /* 
            This  is part of the CODEF project.
            More info : http://codef.santo.fr

            Code is modified to be standalone / work with canvas query
          */
          var tmp = ctx.strokeStyle();
          var tmp2 = ctx.globalAlpha();
          var tmp3 = ctx.lineWidth();
          ctx.globalAlpha(1);
          ctx.strokeStyle(this.color);
          for(var i=0;i<this.n;i++){
            this.test=true;
            this.star_x_save=this.star[i][3];
            this.star_y_save=this.star[i][4];
            this.star[i][0]+=(this.centx-this.x)>>0; 
            if(this.star[i][0]>this.x<<1) { 
              this.star[i][0]-=this.w<<1; 
              this.test=false; 
            } 
            if(this.star[i][0]<-this.x<<1) {
              this.star[i][0]+=this.w<<1; 
              this.test=false; 
            }
            this.star[i][1]+=(this.centy-this.y)>>2; 
            if(this.star[i][1]>this.y<<1) { 
              this.star[i][1]-=this.h<<1; 
              this.test=false; 
            } 
            if(this.star[i][1]<-this.y<<1) {
              this.star[i][1]+=this.h<<1; 
              this.test=false; 
            }
            this.star[i][2]-=this.star_speed; 
            if(this.star[i][2]>this.z) { 
              this.star[i][2]-=this.z; 
              this.test=false; 
            } 
            if(this.star[i][2]<0) { 
              this.star[i][2]+=this.z;
              this.test=false; 
            }
            this.star[i][3]=this.x+(this.star[i][0]/this.star[i][2])*this.star_ratio;
            this.star[i][4]=this.y+(this.star[i][1]/this.star[i][2])*this.star_ratio;
            if(this.star_x_save>0&&this.star_x_save<this.w&&this.star_y_save>0&&this.star_y_save<this.h&&this.test){
              ctx.lineWidth((1-this.star_color_ratio*this.star[i][2])*4);
              ctx.beginPath();
              ctx.moveTo(this.star_x_save+this.offsetx,this.star_y_save+this.offsety);
              ctx.lineTo(this.star[i][3]+this.offsetx,this.star[i][4]+this.offsety);
              ctx.stroke();
              ctx.closePath();
            }
          }

          ctx.strokeStyle(tmp);
          ctx.globalAlpha(tmp2);
          ctx.lineWidth(tmp3);

          // end CODEF

          //text/greets

          ctx.globalAlpha(this.textsOpacity);
          ctx.fillStyle('#fff');

          
          

          if(this.textsArray[this.textsIndex] instanceof Array) {
            var offset;
            
            if (window.innerWidth < 440) {
              ctx.context.font = '3.5pt "Inconsolata"';
              offset = 4;
            } else if(window.innerWidth < 820) {
              ctx.context.font = '5pt "Inconsolata"';
              offset = 6.5
            } else {
              ctx.context.font = '10pt "Inconsolata"';
              offset = 11;
            }
            for(var i = 0; i < this.textsArray[this.textsIndex].length; i++) {
              var xw = this.centx - ctx.measureText(this.textsArray[this.textsIndex][i]).width/2;
              ctx.fillText(this.textsArray[this.textsIndex][i], xw + offset/6*i, this.centy + offset * (i - 2));  
            }
          } else {
            
            var xw = this.centx - ctx.measureText(this.textsArray[this.textsIndex]).width;
            ctx.context.font = '16pt "Noto Sans"';
            ctx.fillText(this.textsArray[this.textsIndex], xw, this.centy);
          }


          ctx.globalAlpha(1);
         

        } else {
          if(this.clearCanvas) {
            ctx.clear();
            this.renderCanvas.clear();
            this.clearCanvas = false;
          }
          //ctx.clear();
          ctx.drawImage(this.staticBuffer.canvas, this.offset.x, this.offset.y);
          
        }
        ctx.restore();
        this.renderCanvas.drawImage(ctx.canvas, 0, 0);

      },
      resize: function (event) {
        // if(window.innerHeight < 200 && !$('body').hasClass('bad')) {
        //  UI.Controllers.Bad.render('!!!', 'you mad? noone does that.');
        // } 

        UI.Background.renderCanvas.canvas.width = UI.Background.buffer.canvas.width = UI.Background.w = window.innerWidth;
        UI.Background.renderCanvas.canvas.height = UI.Background.buffer.canvas.height = UI.Background.h = window.innerHeight;
        UI.Background.centx = window.innerWidth/2;
        UI.Background.centy = window.innerHeight/2;       

        for(var i=0;i<UI.Background.n;i++){
          UI.Background.star[i]=new Array(5);
          UI.Background.star[i][0]=Math.random()*UI.Background.w*2-UI.Background.x;
          UI.Background.star[i][1]=Math.random()*UI.Background.h*2-UI.Background.y;
          UI.Background.star[i][2]=Math.round(Math.random()*UI.Background.z);
          UI.Background.star[i][3]=0;
          UI.Background.star[i][4]=0;
        }
        UI.Background.x = Math.round(UI.Background.w/2);
        UI.Background.y = Math.round(UI.Background.h/2);
      }
    }

  return Background;

});