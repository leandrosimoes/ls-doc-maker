var lsExportedJson = {
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