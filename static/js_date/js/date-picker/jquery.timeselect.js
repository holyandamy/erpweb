(function ($) {
    $.fn.timeselect = function (params) {
        var opts = {
            top: 0,
            left: 0,
            format: function (i) {
                if (i < 10) {
                    return "0" + i;
                } else {
                    return "" + i;
                }
            },
            unit:[true,true,true],
            callback: function () { },
            select: function (time) {  },
            max: false,//[22,30,0]
            min: false,//[7,30,0]
            ranges: [[0,23], [0,59], [0,59]]
        }
        var params = $.extend({}, opts, params || {});
        var fn = {
            init: function (el) {
                var html=this.getHtml(this.getType(el));$(el).next(".timepicker-select-box").size()>0&&(html=$(el).next(".timepicker-select-box"));var show=this.show(html,el),reset=this.reset(html),defaultVlue=this.defaultSelect(html,el),bindclick=this.bindClick(html,el),blur=this.blur(html,el);
            },
            getHtml: function (list) {
              var classes=["timepicker-hour","timepicker-minute","timepicker-second"],html=[];return $.each(list,function(n){if(this.status){var t=$.map(this.list,function(n){return $("<li>",{"class":"timepicker-item",html:$("<a>",{href:"javascript:;","class":"timepicker-value",html:n})})});html.push($("<ul>",{"class":"timepicker-list "+classes[n]+"",html:t}))}}),$("<div>",{"class":"timepicker-select-box"}).html(html);
            },
            show: function (html, el) {
                html.css({top:$(el).position().top+$(el).outerHeight(),left:$(el).position().left});$(el).next(".timepicker-select-box").size()==0?$(el).after(html):html.toggle();
            },
            blur: function (html,el) {
                $(document).bind("click.timeselect", function (n) { html.is(":hidden") || $(n.target).closest(html).size() != 0 || $(n.target).closest(el).size() != 0 || (fn.selectTime(html, el), html.hide(), el.params.callback.call(this, html, el)); }); $(el).unbind("blur").bind("blur", function (n) { html.is(":hidden") || $(n.target).closest(html).size() != 0 || $(n.target).closest(el).size() != 0 || (fn.selectTime(html, el), html.hide(), el.params.callback.call(this, html, el)); });
            },
            reset: function (html) {
                html.find(".selected").removeClass("selected");
            },
            defaultSelect: function (html,el) {
                var value=$(el).val(),time=value.split(":"),times=[0,0,0],unit=el.params.unit;time.length==unit.length?(unit[0]&&(times[0]=time[0]),unit[1]&&(times[1]=time[1]),unit[2]&&(times[2]=time[2])):(times[0]=time[0]||0,times[1]=time[1]||0,times[2]=time[2]);$.each(times,function(n,t){$(html).find(".timepicker-list").eq(n).find(".timepicker-value").eq(parseInt(t)||0).addClass("selected").closest("li").siblings("li").find(".selected").removeClass("selected")});
            },
            bindClick: function (html, el) {
               html.find(".timepicker-value").click(function(){$(this).addClass("selected").closest("li").siblings("li").find(".selected").removeClass("selected");fn.selectTime(html,el)});
            },
            selectTime: function (html,el) {
                var max=el.params.max,min=el.params.min,time=[0,0,0],maxInt="",minInt="",timeInt="",unit,temp=[],lastTime;$(html).find(".timepicker-list").each(function(n){time[n]=Number($(this).find(".selected").text())||0;maxInt+=el.params.format(max[n]);minInt+=el.params.format(min[n]);timeInt+=el.params.format(time[n])});max!=!1&&parseInt(maxInt)<parseInt(timeInt)&&(time=max);min!=!1&&parseInt(minInt)>parseInt(timeInt)&&(time=min);unit=el.params.unit;lastTime=[];temp=[];$.each(unit,function(n,t){t&&temp.push(!0)});$.each(temp,function(n){lastTime.push(time[n])});$(el).val($.map(lastTime,function(n){return el.params.format(n)}).join(":"));el.params.select.call(el,time);
            },
            getType: function (el) {
                var result=el.params.unit,ranges=el.params.ranges,list=[];return $.each(result,function(n,t){for(var r=ranges[n],u=[],i=r[0];i<=r[1];i++)u.push(el.params.format(i));list.push({status:t,list:u})}),list;
            }
        }

        this.each(function () {
          this.fn=fn,this.params=params,this.fn.init(this);
        })
    }
})(jQuery);
