<template>
<div>
     <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">Dashboard</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="/bpc-admin">Home</a></li>
              <li class="breadcrumb-item active">Dashboard</li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->
    <!-- Main content -->
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-4">
            <div class="card">
              <div class="card-header no-border">
                <div class="d-flex justify-content-between">
                  <h3 class="card-title">Site Visitors</h3>
                </div>
              </div>
              <div class="card-body">
                <div class="d-flex">
                  <p class="d-flex flex-column">
                    <span class="text-bold text-lg" v-text="siteVisits"></span>
                    <span>Visitors Over Time</span>
                  </p>
                  <p class="ml-auto d-flex flex-column text-right">
                    <span class="text-success">
                      <i class="fa fa-arrow-up"></i> {{uniqueVisits}}
                    </span>
                    <span class="text-muted">Unique Visits</span>
                  </p>
                </div>
                <!-- /.d-flex -->

                <div class="position-relative mb-4">
                  <canvas id="visitors-chart" height="200"></canvas>
                </div>

                <div class="d-flex flex-row justify-content-end">
                  <span class="mr-2">
                    This Week <b>{{uniqueWeekly}}</b>
                  </span>

                  <span>
                    Today  <b>{{uniqueDaily}}</b>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <!-- /.col-md-6 -->
          <div class="col-lg-8">
            <div class="card">
              <div class="card-header no-border">
                <div class="d-flex justify-content-between">
                  <h3 class="card-title">Sales</h3>
                </div>
              </div>
              <div class="card-body">
                <div class="d-flex">
                  <p class="d-flex flex-column">
                    <span class="text-bold text-lg">${{totalSales}}</span>
                    <span>Sales Over Time</span>
                  </p>
                  <p class="ml-auto d-flex flex-column text-right">
                    <span class="text-success">
                      <i class="fa fa-arrow-up"></i> {{salesGrowth}}%
                    </span>
                    <span class="text-muted">Since last month</span>
                  </p>
                </div>
                <!-- /.d-flex -->

                <div class="position-relative mb-4">
                  <canvas id="sales-chart" height="200"></canvas>
                </div>

                <div class="d-flex flex-row justify-content-end">
                  <span class="mr-2">
                    <i class="fa fa-square text-primary"></i> This year
                  </span>

                  <span>
                    <i class="fa fa-square text-gray"></i> Last year
                  </span>
                </div>
              </div>
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col-md-6 -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- /.content -->
    </div>
</template>
<script>
import Chart from 'chart.js';
export default {
data() {
  return {
    siteVisits:0,
    uniqueVisits: 0,
    salesGrowth:0,
    totalSales:0,
    salesData:[],
    uniqueDaily:0,
    uniqueWeekly:0,

  }
},
  mounted() {
    this.getVisitorSummary();
    this.getSalesAmount();
  },
  methods: {
    getVisitorSummary(){
      axios.get('/api/visitorSummary').then(response => {
        this.siteVisits = response.data.siteVisits;
        this.uniqueVisits = response.data.uniqueVisits;
        this.uniqueDaily = response.data.dailyVisits;
        this.uniqueWeekly = response.data.weeklyVisits;
      }).catch();
    },
    getSalesAmount(){
      axios.get('/api/salesSummary').then(response=>{
          this.totalSales = response.data.totalSales,
          this.salesGrowth = response.data.salesGrowth.toFixed(2),
          this.salesData = response.data.dailySales
          this.graph(this.salesData)
      }).catch();
    },
    graph(salesData){
        var ctx = document.getElementById('sales-chart');
        var myLineChart = new Chart(ctx, {
        type: 'bar',
        data:{
          datasets: [{
          label: 'Daily sales',
          backgroundColor: '#ccc',
					borderColor: '#3490dc',
					data: salesData,
					type: 'line',
					pointRadius: 0,
					fill: false,
					lineTension: 0,
					borderWidth: 2
				}]
      },
            options: {
              scales: {
                xAxes: [{
                  type: 'time',
                  distribution: 'series',
                  ticks: {
                    source: 'data',
                    autoSkip: true
                  }
                }],
                yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'Total sales ($)'
                  }
                }]
              },
            }
        });        
      }
    },
}
</script>

<style>

</style>
