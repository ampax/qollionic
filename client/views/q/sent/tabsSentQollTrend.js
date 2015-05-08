var filename='client/views/q/sent/tabsSentQollTrend.js';

Template.tabsSentQollTrend.helpers({
    qollst : function() {
        qlog.info('Called to get the qollst for owner here ...', filename);
        var qollst = QollForQuestionaireId.find({_id : Session.get('questionnaire_id')}).fetch()[0];

        if(qollst)
        qollst.qolls.map(function(q){
            qlog.info("==========================");
            console.log(q);
            if(q.qoll_response) console.log(q.qoll_response.iscorrect);
        });
        return qollst;
    },
    questId : function() {
        var qollst = QollForQuestionaireId.find({_id : Session.get('questionnaire_id')}).fetch()[0];
        if(qollst) {
            return qollst.questionaire.questId;
        }

        return '';
    },
});

Template.tabsSentQollTrend.onCreated(function(){
    Session.set('context', QollConstants.CONTEXT.READ);
    var userId = Meteor.userId();
    var _id = this._id;

    var dataContext = Template.currentData();
    
    SearchConn.subscribe('QOLL_FOR_QUESTIONAIRE_ID_PUBLISHER', 
        {userId: userId, _id : Session.get('questionnaire_id'), context : Session.get('context')});

    SearchConn.subscribe('images');
    
    qlog.info('Loading inbox for userId/_id ====> ' + userId + '/' + _id + '/' + Session.get('questionnaire_id'), filename);

    qlog.info('Printing QollForQuestionaireId ==========> ' + JSON.stringify(QollForQuestionaireId.find().fetch()));
});

/*
 * Function to draw the column chart
 */
function builtColumn() {

    $('#container-column').highcharts({
        
        chart: {
            type: 'column'
        },
        
        title: {
            text: 'Monthly Average Rainfall'
        },
        
        subtitle: {
            text: 'Source: WorldClimate.com'
        },
        
        credits: {
            enabled: false
        },
        
        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ]
        },
        
        yAxis: {
            min: 0,
            title: {
                text: 'Rainfall (mm)'
            }
        },
        
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        
        series: [{
            name: 'Tokyo',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

        }, {
            name: 'New York',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

        }, {
            name: 'London',
            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

        }, {
            name: 'Berlin',
            data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

        }]
    });
}

/*
 * Call the function to built the chart when the template is rendered
 */
Template.tabsSentQollTrend.rendered = function() {    
    builtColumn();
}