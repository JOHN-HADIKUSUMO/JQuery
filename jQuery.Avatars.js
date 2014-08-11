(function ($) {
    var self;
    $.fn.Avatars = function (options) {
        self = this;
        var settings = $.extend({
            url: '\/REST\/AVATARS\/GET-ALL',
            roleid: 4,
            servicetypeid: 2,
        }, options);

        var _size = {
            width: 800,
            height: 500
        };

        self.content = function(){
            var html = '<div class=\'main\'>';
            html += '<table>';
            html += '<tr>';
            html += '<td class=\'gap\'>&nbsp;</td>';
            html += '<td class=\'header\'>';
            html += '<div class=\'close\'>x</div>';
            html += '</td>';
            html += '<td class=\'gap\'>&nbsp;</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<td class=\'gap\'>&nbsp;</td>';
            html += '<td class=\'content\'>';
            html += '<div></div>';
            html += '</td>';
            html += '<td class=\'gap\'>&nbsp;</td>';
            html += '</tr>';
            html += '</table>';
            html += '</div>';
            return html;
        };

        self.init = function () {
            $(window).on('resize', function () {
                self.reposition();
            });
            self.addClass('avatars');
            self.html(self.content());
            self.reposition();
            $('.avatars .main .close').click(function () {
                self.showOff();
            });

            $.ajax({
                type: 'GET',
                url: settings.url + '\/' + settings.roleid + '\/' + settings.servicetypeid,
                dataType: "json",
                success: function (d) {
                    var content = $('.avatars .content div');
                    var str = "";
                    for (var i = 0; i < d.length; i++) {
                        str += "<div>";
                        str += "<img border=\"1\" src=\"\/SharedFolder\/Photos\/Avatars\/" + d[i].Filename + "\"\/>";
                        str += "<input type=\"hidden\" id=\"hdnID\" value=\"" + d[i].ID + "\"/>";
                        str += "<input type=\"hidden\" id=\"hdnFilename\" value=\"" + d[i].Filename + "\"/>";
                        str += "</div>";
                    }
                    $(str).appendTo(content);

                    $('.avatars .content div div').bind('click', function () {
                        self.showOff();
                        self.callback($(this).find('#hdnID').val(), $(this).find('#hdnFilename').val());
                    });
                },
                error: function (request, status, error) {

                }
            });
        };

        self.callback = function () { };
        self.reposition = function () {
            var n = $('.avatars .main');
            var y = parseInt((self.innerHeight() - _size.height) / 2,10);
            var x = parseInt((self.innerWidth() - _size.width) / 2, 10);
            n.css({ 'top': y + 'px','left': x + 'px', 'width': _size.width + 'px', 'height': _size.height + 'px' });
        };
        self.showOn = function () {
            $('div.avatars').css("display","block");
        };
        self.showOff = function () {
            $('div.avatars').css("display", "none");
        };


        return this;
    };
}(jQuery));
