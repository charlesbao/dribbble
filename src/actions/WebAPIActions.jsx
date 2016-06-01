var $ = require('jquery');

var WebAPIActions = {
    getDribbble: function(callback){
        $.ajax({
            url:'http://open.charlesbao.com/dribbble?nav=popular&page=1',
            dataType:'jsonp',
            type:'get',
            success:function(result){
                callback(result)
            }
        })
    }
};

export default WebAPIActions

