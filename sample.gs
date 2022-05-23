const hoge = () => {
  const date = new Date('2022/03/22');
  const id = 'ja.japanese#holiday@group.v.calendar.google.com'
  const cal = CalendarApp.getCalendarById(id);
  const events = cal.getEventsForDay(date);
  if (events.length) console.log('休みです');
}

class EsaApi {
  constructor(teamName, accessToken) {
    this.teamName_ = teamName;
    this.accessToken_ = accessToken;
  }

  postArticle(payload) {
    const path = `/v1/teams/${this.teamName_}/posts/`;
    this.requestToEsa_('POST', path, payload);
  }

  requestToEsa_(method, pathQuery, body = null) {
    const url = EsaApi.domain_ + pathQuery;
    const params = {
      contentType: 'application/json; charset=utf-8',
      headers: { 'Authorization': `Bearer ${this.accessToken_}` },
      method: method,
      payload: body ? JSON.stringify(body) : null,
      muteHttpExceptions: true
    }
    const response = UrlFetchApp.fetch(url, params);

    return response;
  }
}

EsaApi.domain_ = 'https://api.esa.io';


const main = () => {
  const TEAM_NAME = PropertiesService.getScriptProperties().getProperty("TEAM_NAME");
  const TOKEN = PropertiesService.getScriptProperties().getProperty("TOKEN");
  const POST = {
    "post":{
       "category": "Technology Unit/Weekly KPT/2022",
       "wip":true,
       "template_post_id":3
    }
 }

  const esa = new EsaApi(TEAM_NAME, TOKEN, debugMode = true);
  esa.postArticle(POST);
}
