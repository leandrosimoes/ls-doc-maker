# ls-doc-maker
[NW.JS](https://github.com/nwjs/nw.js) app to make API's documentations based on JSON objects.

### How it works?

* Clone this project
* Download NW.JS package and unzip 
* Execute the `npm i` command to install the dependencies
* Open the `nw.exe` and use de code editor (tks to [ACE](https://github.com/ajaxorg/ace) code editor) to edit the JSON objects. 
* See the changes in real-time (tks to [knockout](https://github.com/knockout/knockout)) and export the result into index.html, js and css files to use in your website.

### What is the JSON structure accepted?

This is the structure accepted at the moment:

```JSON
{
    "title": "Sample API",
    "url": "api.sample.com",
    "observations": "Just a sample of JSON object to make your documentation.",
    "groups": [
        {
            "title": "Group Title!",
            "items": [
              {
                  "title": "First API Method Sample",
                  "description": "This is a short description about the first API method sample",
                  "type": "GET",
                  "path": "/first/call/path",
                  "headers": [
                    {
                        "description": "First Header Parameter",
                        "key": "FirstHeaderParameterKey",
                        "value": "FirstHeaderParameterValue"
                    },
                    {
                        "description": "Second Header Parameter",
                        "key": "SecondHeaderParameterKey",
                        "value": "SecondHeaderParameterValue"
                    }
                  ],
                  "parameters": [
                    {
                        "description": "First Body Parameter",
                        "key": "FirstBodyParameterKey",
                        "value": "FirstBodyParameterValue"
                    },
                    {
                        "description": "Second Body Parameter",
                        "key": "SecondBodyParameterKey",
                        "value": "SecondBodyParameterValue"
                    }
                  ],
                  "responses": [
                    {
                        "description": "Success Response",
                        "code": "200",
                        "schema": {
                            "data": {
                                "someParamKey": "someParamValue"
                            }
                        }
                    },
                    {
                        "description": "Unauthorized Response",
                        "code": "401",
                        "schema": {
                            "error": "Unauthorized exception"
                        }
                    }
                  ]
              },
              {
                  "title": "Second API Method Sample",
                  "description": "This is a short description about the second API method sample",
                  "type": "POST",
                  "path": "/second/call/path",
                  "headers": [
                    {
                        "description": "First Header Parameter",
                        "key": "FirstHeaderParameterKey",
                        "value": "FirstHeaderParameterValue"
                    },
                    {
                        "description": "Second Header Parameter",
                        "key": "SecondHeaderParameterKey",
                        "value": "SecondHeaderParameterValue"
                    }
                  ],
                  "parameters": [
                    {
                        "description": "First Body Parameter",
                        "key": "FirstBodyParameterKey",
                        "value": "FirstBodyParameterValue"
                    },
                    {
                        "description": "Second Body Parameter",
                        "key": "SecondBodyParameterKey",
                        "value": "SecondBodyParameterValue"
                    }
                  ],
                  "responses": [
                    {
                        "description": "Success Response",
                        "code": "200",
                        "schema": {
                            "data": {
                                "someParamKey": "someParamValue"
                            }
                        }
                    },
                    {
                        "description": "Unauthorized Response",
                        "code": "401",
                        "schema": {
                            "error": "Unauthorized exception"
                        }
                    }
                  ]
              }
            ]
        }
    ]
};
```
### How it looks?

See the [live sample](http://lesimoes.com.br/ls-doc-maker/)


### Showcase

[Tanaconta API](http://api.tanaconta.com.br) - API for integration with the [Tanaconta](http://tanaconta.com.br) app.

[SimplificaCI API](https://api.simplificaci.com.br) - API for integration with the [SimplificaCI](https://simplificaci.com.br) app.

### Build a valid json with axios middleware

I just create a axios middleware to build a Ls Doc Maker valid json file automatically based on your requests. You can se how it works and how to use here: [ls-doc-maker-axios-middleware](https://github.com/leandrosimoes/ls-doc-maker-axios-middleware)

### TODO

* URGENT: When the method is GET, change the BODY PARAMETERS to QUERY PARAMETERS and setup a query parameter sample;
* URGENT: Change the save method to save in a local .json file and stop to use the `localStorage`;
* URGENT: Change the load method to load from a local .json file and stop to use the `localStorage`;
* Buttom do close all when any doc is open;
* '+' or '-' Icons when is open or close;
* Buttom to back to the top;
* Export/Import just the JSON file;

### Contribute

Just open Pull Requests on `develop` branch, open issues or just mail me: [leandro.simoes@outlook.com](mailto:leandro.simoes@outlook.com)
