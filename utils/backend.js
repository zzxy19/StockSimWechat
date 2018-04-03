var httpMethod = "http://";
var ip = "18.220.245.253:8080";

function buildSearchSymbolRequestUrl(symbol, maxResult) {
  var outputUrl = httpMethod + ip + "/searchSymbol" +
      "?symbol=" + symbol;
  if (maxResult) {
    outputUrl += "&max_result=" + maxResult;
  }
  return outputUrl;
}

function buildShowPriceTimelineRequestUrl(symbol, type, startDate, dateRange) {
  var outputUrl = httpMethod + ip + "/showPriceTimeline" +
      "?symbol=" + symbol;
  if (type) {
    outputUrl += "&type=" + type;
  }
  if (startDate) {
    outputUrl += "&start_date=" + startDate;
  }
  if (dateRange) {
    outputUrl += "&date_range=" + dateRange;
  }
  
  return outputUrl;
}

module.exports = {
  buildShowPriceTimelineRequestUrl: buildShowPriceTimelineRequestUrl,
  buildSearchSymbolRequestUrl: buildSearchSymbolRequestUrl
}