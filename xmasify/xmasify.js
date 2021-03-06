/**
 * xmasify.js - christmasify your team page
 *
 * written by Josef Trauner (@josef_trauner) and Gregor Dorfbauer (@dorfbauer)
 * for the Usersnap team page https://usersnap.com/
 *
 **/
/* Example usage:

DOM-Structure:

<div class="team-members">
    <div class="team-member">
           ... image, text, ...
    </div>
    ...
    <div class="team-member">
          ... image, text, ...
    </div>
</div>

Call (please note wrap_sel + member_sel):

Xmasify.xmasify({
    wrap_sel: '.team-members',
    member_sel: '.team-member',
    disableSound: false,
    static_dir: "/xmasify/",
    pos_map: [{
        width: 240,
        top: -104,
        left: -34,
        rot: 0,
        flip: true
    }]
});
*/
var Xmasify = (function() {


    var BASE_URL = "/";
    var defs = {
        flip: false,
        width: 200,
        rot: 0,
        top: -50,
        left: 50
    };

    function createHat(teamm, sett, idx) {
        sett = sett || {};
        sett.flip = sett.flip || defs.flip;
        sett.width = sett.width || defs.width;
        sett.rot = sett.rot || defs.rot;
        sett.top = sett.top || defs.top;
        sett.left = sett.left || defs.left;

        var hutStyle = document.createElement('style');
        hutStyle.type = 'text/css';

        var rules;
        if (sett.flip) {
            rules = document.createTextNode('@-webkit-keyframes wiggle' + idx + ' {from {-webkit-transform: rotateZ(' + (sett.rot + 2) + 'deg) rotateY(180deg);} 50% {-webkit-transform: rotateZ(' + (sett.rot - 2) + 'deg) rotateY(180deg);}   to {-webkit-transform: rotateZ(' + (sett.rot + 2) + 'deg) rotateY(180deg);}}');
        } else {
            rules = document.createTextNode('@-webkit-keyframes wiggle' + idx + ' {from {-webkit-transform: rotateZ(' + (sett.rot + 2) + 'deg);} 50% {-webkit-transform: rotateZ(' + (sett.rot - 2) + 'deg);}   to {-webkit-transform: rotateZ(' + (sett.rot + 2) + 'deg);}}');
        }
        var rules2 = document.createTextNode('.hut' + idx + ':hover { -webkit-animation-name: wiggle' + idx + ';  -webkit-animation-duration: .4s;  -webkit-animation-iteration-count: infinite;   -webkit-animation-timing-function: ease;}');
        hutStyle.appendChild(rules);
        hutStyle.appendChild(rules2);
        document.body.appendChild(hutStyle);
        var hut = document.createElement('div');
        hut = jQuery(hut);
        hut.addClass('hut' + idx);
        hut.css({
            width: sett.width + 'px',
            height: sett.width + 'px',
            position: 'absolute',
            backgroundImage: 'url(' + BASE_URL + 'santas_hat.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: sett.width + 'px',
            transform: 'rotateZ(' + sett.rot + 'deg)',
            top: sett.top,
            left: sett.left,
            "z-index": 50000
        });
        if (sett.flip) {
            hut.css('transform', 'rotateY(180deg)');
        }
        teamm.append(hut);
    }

    function createSong() {
        var audio = document.createElement("iframe");
        audio.src = "https://archive.org/embed/JingleBells_903&autoplay=1";
        document.body.appendChild(audio);
        jQuery(audio).css({
            position: "fixed",
            bottom: 0,
            left: 0,
            height: 30,
            width: 100
        });
    }

    function createSharer() {
        var sharer = document.createElement("div");
        jQuery(sharer).css({
            position: "fixed",
            top: 50,
            right: 50,
            width: 300,
            height: 150,
            background: "white",
            color: "black",
            border: "1px solid #888",
            "text-align": "center",
            "padding-top": 35,
            "z-index": 50000
        });
        sharer.innerHTML = "<h1 style='font-family:Helvetica,Arial;color:#666;font-size: 28px;margin:0;padding:0;line-height:1.2em;'>Share this xmasified team page</h1>" +
            '<img src="'+BASE_URL+'christmas_stuff.png" style="max-width:initial; position: absolute; left: -30px; top: -50px;"/>'+
            "<p style='font-family:Helvetica,Arial;color:#888; font-size:20px;padding:0;margin:0;'>" +
            '<a href="https://twitter.com/share" class="twitter-share-button" data-text="Check out this awesome xmasified team page powered by xmasify.js!" data-via="usersnap" data-hashtags="xmasify">Tweet</a>' +
            '<iframe src="//www.facebook.com/plugins/share_button.php?href=' + escape(window.location.href) + '&amp;layout=button_count" scrolling="no" frameborder="0" style="height:20px;width:100px;border:none; overflow:hidden;" allowTransparency="true"></iframe>' +
            "</p><p style='font-family:Helvetica,Arial;color:#888;font-size:14px;padding:30px 0 0 0;margin:0;'>" +
            "<a style='font-family:Helvetica,Arial;color:#888;' href='https://github.com/usersnap/xmasify'>Xmasify your own team page</a> " +
            " by <a style='font-family:Helvetica,Arial;color:#888;' href='https://usersnap.com?gat=xmas'>@usersnap</a></p>";

        document.body.appendChild(sharer);

        // load twitter sharer
        ! function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0],
                p = /^http:/.test(d.location) ? 'http' : 'https';
            if (!d.getElementById(id)) {
                js = d.createElement(s);
                js.id = id;
                js.src = p + '://platform.twitter.com/widgets.js';
                fjs.parentNode.insertBefore(js, fjs);
            }
        }(document, 'script', 'twitter-wjs');

    };

    function christmas(options) {
        options = options || {};
        var wrap_sel = options.wrap_sel;
        var member_sel = options.member_sel;
        var member_wrap_sel = options.member_wrap_sel;
        //create song
        if (!options.disableSound) {
            createSong();
        }
        if (options.static_dir) {
            BASE_URL = options.static_dir;
        }
        if (options.defs) {
            for (var arg in options.defs) {
                if (options.defs.hasOwnProperty(arg)) {
                    defs[arg] = options.defs[arg];
                }
            }
        }

        createSharer();
        var memb = jQuery(wrap_sel);
        memb.find(member_sel).css('position', 'relative');
        var posMap = options.pos_map || [];
        memb.find(member_sel).each(function(k, v) {
            var m = jQuery(this);
            createHat(m, posMap[k], k);
        });
    }

    function christmas_loader(options) {
        if (!window.jQuery) {
            var script = document.createElement('script');
            script.type = "text/javascript";
            script.src = "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js";
            script.onload = function() {
                christmas(options);
            };
            document.getElementsByTagName('head')[0].appendChild(script);
        } else {
            christmas(options);
        }
    };
    return {
        xmasify: function(options) {
            christmas_loader(options);
        }
    };
}());
