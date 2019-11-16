// スピードメーター

            const mode = "BootCamp"; // "Native" or "BootCamp"
            const hostname = "raspberrypi.local";
            
            if (mode == "Native") {
                ws = new WebSocket("ws://" + hostname + ":8087/"); // SDL Native
            } else {
                ws = new WebSocket("ws://" + hostname + ":8088/"); // SDL BootCamp
            }
            // 接続
            ws.addEventListener("open", function(e) {
                console.log("WebSocket connected");
            });
            // サーバーからデータを受け取る
            ws.addEventListener("message", function(e) {
                console.log("on message", e.data);
            });
            function send($params) {
                if (mode == "Native") {
                    sendData = {
                        // SDL Native
                        jsonrpc: "2.0",
                        method: "VehicleInfo.OnVehicleData",
                        params: $params
                    };
                } else {
                    sendData = { VehicleData: $params }; // SDL BootCamp
                }
                console.log(JSON.stringify(sendData));
                ws.send(JSON.stringify(sendData));
            }
            function changeElectronicParkBrakeStatus() {
                var electronicParkBrakeStatus = document.getElementsByName(
                    "electronicParkBrakeStatus"
                );
                for (var i = 0; i < electronicParkBrakeStatus.length; i++) {
                    if (electronicParkBrakeStatus[i].checked) {
                        send({
                            electronicParkBrakeStatus:
                                electronicParkBrakeStatus[i].value
                        });
                    }
                }
            }
            function changeTurnSignal() {
                var turnSignal = document.getElementsByName("turnSignal");
                for (var i = 0; i < turnSignal.length; i++) {
                    if (turnSignal[i].checked) {
                        send({ turnSignal: turnSignal[i].value });
                    }
                }
            }
            function changePrndl() {
                var prndl = document.getElementsByName("prndl");
                for (var i = 0; i < prndl.length; i++) {
                    if (prndl[i].checked) {
                        send({ prndl: prndl[i].value });
                    }
                }
            }
            function changeSpeed() {
                var speed = document.getElementsByName("speed")[0];
                send({ speed: speed.value });
            }
            function changeRpm() {
                var rpm = document.getElementsByName("rpm")[0];
                send({ rpm: rpm.value });
            }
            function changeAccPedalPosition() {
                var accPedalPosition = document.getElementsByName(
                    "accPedalPosition"
                )[0];
                send({ accPedalPosition: accPedalPosition.value });
            }


