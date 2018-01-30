J.dna = {
    direction : 'main',
    initDeg : 0,
    singleHeight : 252,
    singleAngel : 30,
    translate : $(document).width()/2,
    seed : 252/30,
    flagDataEmpty : false,
    flagDataLoading : false,
    pn : 1,
    dnaRotate : function(data){
        J.lock.dnaScroll = true;
        J.dna.direction = J.dna.direction == 'main' ? 'follow' : 'main';
        J.dna.data = data;
        J.dna.pn = 1;
        J.dna.flagDataEmpty = false;
        var $rotateContainer = $('#jMainContainer .mod-dna-wrapper'),
            doc = document.documentElement;
        if (!$rotateContainer){
            return;
        }
        $rotateContainer.css(J.css.transition, '');
        $rotateContainer.one(J.eve.transitionEnd, function(){
            J.lock.dnaScroll = false;
            $rotateContainer.css(J.css.transition, 'none');

            if (data){
                J.dna.buildDna(data);
            }
        });
        var scrollTop = doc.scrollTop;
        J.dna.initDeg -= 180;
        $rotateContainer.css(J.css.transform, 'rotateY(' + (scrollTop/J.dna.seed*(-1) + J.dna.initDeg) + 'deg)');
    },
    buildDna : function(data, flagPushData){
        var $mainList = $('#dnaMainList'),
            $followList = $('#dnaFollowList'),
            $barList = $('#dnaBarList'),
            $dnaMainItems = $mainList.find('li'),
            $dnaFollowItems = $followList.find('li'),
            $dnaBarItems = $barList.find('li'),
            dataLen = data.length,
            elemLen = $dnaMainItems.length,
            $dnaTrunkItems = $dnaMainItems,
            $dnaAddedItems = $dnaFollowItems,
            $trunkList = $mainList,
            $addedList = $followList,
            $rotateContainer = $('#jMainContainer .mod-dna-wrapper');

        if (J.dna.direction == 'follow'){
            $dnaTrunkItems = $dnaFollowItems;
            $dnaAddedItems = $dnaMainItems;
            $trunkList = $followList;
            $addedList = $mainList;
        }

        if (!flagPushData && elemLen > dataLen){
            for (var i = 0 ; i < elemLen ; i++){
                var $trunkItem = $($dnaTrunkItems[i]),
                    $addedItem = $($dnaAddedItems[i]),
                    $barItem = $($dnaBarItems[i]),
                    artItem = data[i];

                if (i < dataLen){
                    $trunkItem.html([
                        '<a href="/article/' + artItem._id + '" title="' + artItem.title + '" class="bg-space j-link" style="background-image:url(' + artItem.prePic + ')">',
                            '<div class="blog-desc">',
                                '<em class="yh">' + artItem.title + '</em>',
                            '</div>',
                        '</a>'
                    ].join(''));
                    $addedItem.html('');
                }
                else{
                    $trunkItem.remove();
                    $addedItem.remove();
                    $barItem.remove();
                }
            }
        }
        else{
            var appendTrunkArg = [],
                appendAddedArg = [],
                appendBarArg = [],
                singleAngel = J.dna.singleAngel,
                translate = J.dna.translate;
            for (var i = 0 ; i < dataLen ; i++){
                var $trunkItem = $($dnaTrunkItems[i]),
                    $addedItem = $($dnaAddedItems[i]),
                    $barItem = $($dnaBarItems[i]),
                    artItem = data[i];

                if (!flagPushData && i < elemLen){
                    var $trunkItem = $($dnaTrunkItems[i]),
                        $addedItem = $($dnaAddedItems[i]),
                        $barItem = $($dnaBarItems[i]);
                    $trunkItem.html([
                        '<a title="' + artItem.title + '" href="/article/' + artItem._id + '" class="bg-space j-link" style="background-image:url(' + artItem.prePic + ')">',
                            '<div class="blog-desc">',
                                '<em class="yh">' + artItem.title + '</em>',
                            '</div>',
                        '</a>'
                    ].join(''));
                    $addedItem.html('');
                }
                else{
                    var trankStyle,
                        addedStyle,
                        barStyle,
                        index = flagPushData ? elemLen + i : i;
                    if (J.dna.direction == 'follow'){
                        addedStyle = J.css.transform + ':rotateY(' + index * singleAngel + 'deg) translateZ(' + translate +'px)';
                        trankStyle = J.css.transform + ':rotateY(' + (180 + index * singleAngel) + 'deg) translateZ(' + translate + 'px)';
                        barStyle = J.css.transform + ':rotateY(' + (90 + index * singleAngel) + 'deg);width:' + translate * 2 + 'px';
                    }
                    else{
                        trankStyle = J.css.transform + ':rotateY(' + index * singleAngel + 'deg) translateZ(' + translate +'px)';
                        addedStyle = J.css.transform + ':rotateY(' + (180 + index * singleAngel) + 'deg) translateZ(' + translate + 'px)';
                        barStyle = J.css.transform + ':rotateY(' + (450 + index * singleAngel) + 'deg);width:' + translate * 2 + 'px';
                    }
                    appendTrunkArg.push([
                        '<li class="it" style="' + trankStyle + '">',
                            '<a title="' + artItem.title + '" href="' + artItem.url + '" class="bg-space j-link" style="background-image:url(' + artItem.prePic + ')">',
                                '<div class="blog-desc">',
                                    '<em class="yh">' + artItem.title + '</em>',
                                '</div>',
                            '</a>',
                        '</li>'
                    ].join(''));
                    appendAddedArg.push('<li class="it" style="' + addedStyle + '"></li>');
                    appendBarArg.push([
                        '<li class="it" style="' + barStyle + '">',
                            '<div class="ca" style="border-width:' + (translate - 5) + 'px"></div>',
                            '<div class="cb" style="border-width:' + (translate - 5) + 'px"></div>',
                            '<div class="cc" style="border-width:' + (translate - 5) + 'px"></div>',
                            '<div class="cd" style="border-width:' + (translate - 5) + 'px"></div>',
                            '<div class="ce" style="border-width:' + (translate - 5) + 'px"></div>',
                            '<div class="cf" style="border-width:' + (translate - 5) + 'px"></div>',
                        '</li>'
                    ].join(''));
                }
            }

            $trunkList.append(appendTrunkArg.join(''));
            $addedList.append(appendAddedArg.join(''));
            $barList.append(appendBarArg.join(''));
        }
        $('#mainBody').css('height', $rotateContainer.height() + J.dna.singleHeight + 'px');
        $(window).trigger('dnachange', J.dna.data);
    },
    scrollInit : function(){
        var df = $.Deferred();

        var doc = document.documentElement;
        var seed = J.dna.seed;
        var $mainContainer = $('#jMainContainer');
        var $dnaContainer = $mainContainer.find('.mod-dna-container');
        var $rotateContainer = $dnaContainer.find('.mod-dna-wrapper');
        var $win = $(window);
        $win.scroll(function(){
            if (J.lock.dnaScroll){
                return;
            }
            var scrollTop = doc.scrollTop*(-1);
            $rotateContainer.css(J.css.transform, 'rotateY(' + (scrollTop/seed + J.dna.initDeg).toFixed(1) + 'deg)');
                
            $dnaContainer.css('margin-top', scrollTop + 'px');
        });

        df.resolve();
        return df.promise();
    },
    init : function(){
        var df = $.Deferred();
        var $mainContainer = $('#jMainContainer'),
            $dnaContainer = $mainContainer.find('.mod-dna-container'),
            $rotateContainer = $dnaContainer.find('.mod-dna-wrapper'),
            singleAngel = J.dna.singleAngel,
            translate = J.dna.translate;

        var dnaContainerCss = {};
        dnaContainerCss['margin-left'] = translate*(-1) + 'px';
        dnaContainerCss[J.css.transform] = 'translateZ(-' + translate + 'px)';
        $dnaContainer.css(dnaContainerCss);

        $('#mainBody').css('height', $rotateContainer.height() + J.dna.singleHeight + 'px');

        var $dnaMainItems = $('#dnaMainList li'),
            $dnaFollowItems = $('#dnaFollowList li'),
            $dnaBarItems = $('#dnaBarList li');
        for (var i = 0, len = $dnaMainItems.length ; i < len ; i++){
            var $mainItem = $($dnaMainItems[i]),
                $followItem = $($dnaFollowItems[i]),
                $barItem = $($dnaBarItems[i]);

            $mainItem.css(J.css.transform, 'rotateY(' + i * singleAngel + 'deg) translateZ(' + translate +'px)');
            $followItem.css(J.css.transform, 'rotateY(' + (180 + i * singleAngel) + 'deg) translateZ(' + translate + 'px)');
            var barCss = {};
            barCss[J.css.transform] = 'rotateY(' + (90 + i * singleAngel) + 'deg)';
            barCss['width'] = translate * 2 + 'px';
            $barItem.css(barCss).find('div').css('border-width', (translate - 5) + 'px');
        }

        $rotateContainer.removeClass('uninit');
        $rotateContainer.one(J.eve.transitionEnd, function(){
            $rotateContainer.css(J.css.transition, 'none');
            df.resolve();
        });

        return df.promise();
    }
};
