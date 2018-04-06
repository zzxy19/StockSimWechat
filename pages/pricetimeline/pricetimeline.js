// pages/pricetimeline/pricetimeline.js
var backend = require('../../utils/backend.js');
var wxCharts = require('../../utils/wxcharts/wxcharts-min.js');
var priceTimelineCanvas = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    symbol: null,
    lastRefreshed: null,
    dateRangeOption: [
      { displayName: "Day", dateRange: "DAY" },
      { displayName: "Week", dateRange: "WEEK" },
      { displayName: "Month", dateRange: "MONTH", selected: true },
      { displayName: "Year", dateRange: "YEAR" }
    ],
    pageLoading: true,
    currentDateRange: "MONTH",
  },

  loadPriceTimelineData: function () {
    var url = backend.buildShowPriceTimelineRequestUrl(
      this.data.symbol, this.data.currentDateRange);
    var that = this;
    wx.request({
      url: url,
      method: "GET",
      success: function (res) {
        that.setData({
          lastRefreshed: res.data.timeSeries.lastRefreshed,
          pageLoading: false
        });
        var timeSeriesData = res.data.timeSeries.values;
        var timeValues = timeSeriesData.map(d => d.time);
        var priceValues = timeSeriesData.map(d => d.close);
        that.fillInPriceTimelineChart(timeValues, priceValues);
      }
    })
  },

  fillInPriceTimelineChart: function(timeValues, priceValues) {
    priceTimelineCanvas = new wxCharts({
      canvasId: 'priceTimelineCanvas',
      type: 'line',
      categories: timeValues,
      animation: true,
      // background: '#f5f5f5',
      series: [{
        name: 'Price',
        data: priceValues,
        format: function (val, name) {
          return '$' + val.toFixed(2);
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: 'Price',
        min: 0
      },
      width: 400,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  },

  onDateRangeChanged: function(e) {
    this.setData({
      currentDateRange: e.detail.value,
      pageLoading: true
    });
    this.loadPriceTimelineData();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      symbol: options.symbol,
    })
    this.loadPriceTimelineData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})