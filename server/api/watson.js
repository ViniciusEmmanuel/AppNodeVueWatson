var LanguageTranslatorV3 = require('watson-developer-cloud/language-translator/v3');


var languageTranslator = new LanguageTranslatorV3({
    version: '2018-05-01',
    iam_apikey: 'gRtVn0UxWjLKiv7LsvoBCVhg2_4iCSUDhwoXtlWEObQO',
    url: 'https://gateway.watsonplatform.net/language-translator/api'
});

exports.postTranslate = (req, res) => {
    let model_id = req.body.model_id;
    let txt = req.body.text;

    let parameters = {
        text: txt,
        model_id: model_id
    };

    languageTranslator.translate(parameters, function (error, response) {
        res.status(200).send(response.translations);
    });


};



//*******************************************************************************
//Personality Insights

var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

var personalityInsights = new PersonalityInsightsV3({
    version: '2017-10-13',
    iam_apikey: '98rszqoeLLnB0xPbsLIaFthNB0xI9Fna59hjT-OonmZK',
    url: 'https://gateway.watsonplatform.net/personality-insights/api'
});
exports.postPersonality = (req, res) => {
//Personality Insights
    let txt = req.body.text;

    let profileParams = {
        // Get the content from the JSON file.
        content: txt,
        content_type: 'text/plain',
        language: "pt-BR",
        consumption_preferences: true,
        raw_scores: true
    };

    personalityInsights.profile(profileParams, function (error, profile) {
        const perosnality = profile.personality.map((personality) =>{
           return personality;
    });
        const needs = profile.needs.map((needs) =>{
            return needs;
        });
        const values = profile.values.map((values) =>{
            return values;
        });
        const resp = [perosnality,needs,values];
        res.status(200).send(resp);
    });

};


