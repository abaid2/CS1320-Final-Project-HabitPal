<template>
<div>
    <LeaderboardViewer class="chart" :chartData="chartData" :options="options" />
    
</div>
</template>

<script>
import LeaderboardViewer from './LeaderboardViewer';
export default {
    name: 'Leaderboard',
    props: {
        logs: Object,
        members: Object,
    },
    components: {
        LeaderboardViewer,
    },
    data: function() {
        return {
            logList: [],
            chartData: null,
            options: {
                responsive: true,
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: 'white',
                            callback: function() {
                                return '';
                            },
                        },
                        gridLines: {
                            display: false,
                            drawBorder: false,
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: 'white',
                        },
                        gridLines: {
                            display: false,
                            drawBorder: false,                        },
                    }]
                }
            },
         }
    },
    created: function() {
        this.chartData = {labels: [], datasets: [{
            backgroundColor: ['rgb(255, 205, 86)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
            hoverBackgroundColor: ['rgb(247, 174, 2)', 'rgb(199, 44, 98)', 'rgb(15, 122, 245)'],
            data: []
        }]};
        this.renderLeaderboard();
    }, methods: {
        renderLeaderboard() {
            this.logList = [];
            for (let key in this.logs) { this.logList.push([key, this.logs[key]]); }
            this.logList.sort(function(a, b) {
                a = a[1].length;
                b = b[1].length;
                return a > b ? -1 : (a < b ? 1 : 0);
            });
            this.logList.slice(0, 3);
            const temp = this.logList[1];
            this.logList[1] = this.logList[0];
            this.logList[0] = temp;
            this.logList.map((record) => {
            this.chartData.labels.push(this.members[record[0]].username);
            this.chartData.datasets[0].data.push(record[1].length); 
            });
        }
    }
}
</script>

<style scoped>
h2 {
    color: floralwhite;
}

.chart {
    /* background-color: yellow; */
}
</style>