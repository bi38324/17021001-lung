/**
* 功能说明:		复选框/单选框的全选反选以及文字点击控制的插件
* @author:		vivy <lizhiziyan@qq.com>
* @time:		2016-08-22 11:15:30
* @version:		V1.1.0
* @js调用方法[复选框]：
* $("#id").selectCheck({
* 	parentSelect:"p",//支持文字也选中的标签，例子中时P标签，根据具体情况换成li,div等。不需要要控制时设为null
* 	allId: 'checkAll',//全选反选input的ID,如果不需要全选反选，则设置为nul
* 	toggleClass: 'check_span--checked',//改变的样式名，针对例子中的复选框样式美化
* 	checkCallBack:function(obj,bool){}//选择之后回调函数,返回obj的是否选中
* })
* @js调用方法[单选框]：
* $("#id").selectRadio({
* 	parentSelect:"p",//支持文字也选中的标签，例子中时P标签，根据具体情况换成li,div等。不需要要控制时设为null
* 	toggleClass: 'radio_span--checked'//改变的样式名，针对例子中的复选框样式美化
* })
*
*/
(function($) {
    $.fn.extend({
        selectCheck: function(f) {
            var g = {
                parentSelect: "li",
                allId: 'checkAll',
                toggleClass: 'check_span--checked',
                checkCallBack: function(a, b) {}
            };
            var f = $.extend(g, f);

            function checkAll(a, b, c, d) {
                var o = f;
                var e = $("#" + o.allId);
                if (o.checkCallBack && $.isFunction(o.checkCallBack)) {
                    o.checkCallBack.call(this, d, c)
                }
                if (b.attr("id") == o.allId) {
                    if (c) {
                        a.prop("checked", true);
                        a.parent().addClass(o.toggleClass);
                        b.prop("checked", true)
                    } else {
                        a.removeAttr("checked");
                        a.parent().removeClass(o.toggleClass);
                        b.removeAttr("checked")
                    }
                } else {
                    if (!c) {
                        b.removeAttr("checked");
                        b.parent().removeClass(o.toggleClass);
                        e.parent().removeClass(o.toggleClass);
                        e.removeAttr("checked")
                    } else {
                        b.prop("checked", true);
                        b.parent().addClass(o.toggleClass);
                        for (var i = 0; i < a.length; i++) {
                            if (a[i].checked == false && a[i].id != o.allId) return
                        }
                        e.parent().addClass(o.toggleClass);
                        e.prop("checked", true)
                    }
                }
            }
            return this.each(function() {
                var o = f;
                var b = $(this);
                var c = this;
                var d = $('input:checkbox', b);
                if (o.parentSelect) {
                    d.parents(o.parentSelect).click(function(e) {
                        if (o.allId) {
                            var a = $(this).find("input:checkbox");
                            if ($(e.target).attr("type") == "checkbox") checkAll(d, $(e.target), e.target.checked, b);
                            else checkAll(d, a, !a.is(":checked"), b)
                        } else {
                            if ($(e.target).attr("type") == "checkbox") {
                                $(e.target).parent().toggleClass(o.toggleClass);
                                if (o.checkCallBack && $.isFunction(o.checkCallBack)) {
                                    o.checkCallBack.call(c, b, e.target.checked)
                                }
                            } else {
                                $('input:checkbox', $(this)).parent().toggleClass(o.toggleClass);
                                if (o.checkCallBack && $.isFunction(o.checkCallBack)) {
                                    o.checkCallBack.call(c, b, $('input:checkbox', $(this)).is(":checked"))
                                }
                            }
                        }
                    });
                    return
                }
                d.click(function() {
                    if (o.allId) {
                        checkAll(d, $(this), this.checked.obj)
                    } else {
                        $(this).parent().toggleClass(o.toggleClass);
                        if (o.checkCallBack && $.isFunction(o.checkCallBack)) {
                            o.checkCallBack.call(c, b, this.checked)
                        }
                    }
                })
            })
        },

        selectRadio: function(c) {
            var d = {
                parentSelect: "li",
                toggleClass: 'radio_span--checked'
            };
            var c = $.extend(d, c);
            return this.each(function() {
                var o = c;
                var a = $(this);
                var b = $('input:radio', a);
                if (o.parentSelect) {
                    b.parents(o.parentSelect).click(function(e) {
                        b.parent().removeClass(o.toggleClass);
                        if ($(e.target).attr("type") == "radio") $(e.target).parent().addClass(o.toggleClass);
                        else $("input:radio", $(this)).parent().addClass(o.toggleClass)
                    });
                    return
                }
                b.click(function() {
                    b.parent().removeClass(o.toggleClass);
                    $(this).parent().addClass(o.toggleClass)
                })
            })
        }
    })


})(jQuery);







