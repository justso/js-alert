/** VERSION =============================================================== *
 *  drt-alert.js  ^  dvdrtrgn  ^  2011-09-12 .. 2011-12-30
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/**
 * Like window alert with the added methods
 * @param msg {string} message
 * @param sec {number} time to display
 *
 * @2do: timer, an css class accessor
 */
function Alert(msg, sec){
    this.__ = 'drt__Alert';
    this._msg = msg || '';
    this._sec = sec || this._sec;

    var me = this
    ,   _  = me._
    ;
    _.timer.append(_.close)
    _.main.append(_.timer).append(_.text);
    _.base.append(_.cover).append(_.main).appendTo('body');

    if (msg) {
        me.show().time();
    }

    // handlers to cancel overlay
    _.close.bind('click', function (){
        me.hide()
    });
    $('body').one('keydown', function (evt){
        var kc = evt.keyCode;
        if (kc == 13 || kc == 27 || kc == 32)
            me.hide()
    });
}
$.extend(Alert.prototype, {
    __ : 'Alert', /*
     * message @type string */
    _msg : null,
    _sec : 3,
    _ : {  // construct elements as "_"
        base :  $('<div id="Alert"></div>'),
        cover:  $('<div class="cover"></div>'),
        main:   $('<div class="main"></div>'),
        close:  $('<div class="close">X</div>'),
        text:   $('<div class="text"></div>'),
        timer:  $('<div class="timer">Alert</div>')
    },
    /**
     * call this to set off the keg
     */
    hide : function (){
        this._.base.hide();
        this._.main.hide();
        return this;
    },
    mode : function (b){
        this.hide();
        this._.base[b?'show':'hide']();
    },
    read : function (){ // reset message and style
        this._.timer.css({
            opacity:'1'
        });
        this._.text.text(this._msg);
    },
    show : function (){
        this.read();
        if ($.browser.msie) this._.base.addClass('ie');
        this._.base.show();
        this._.main.show();
        this._.close.focus();
        return this;
    },
    time : function (n){ // handler needs me
        var me = this;
        me._.timer.stop();
        me._.timer.animate({
            opacity:'.1'
        }, n || me._sec*1500, 'swing', function (){
            me.hide();
        });
        return me;
    }
});
$.extend(Alert, {
    test : function (){
        new this('I show a test message for the default amount of time: '
            + this.prototype._sec);
    },
    init : function (){
        $.loadCssFor('alert');
    },
    mode : function (b){
        new this().mode(b);
    }
})
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
$(Alert.init);
