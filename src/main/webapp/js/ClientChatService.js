/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*MP Telecom chatbox v0.1*/
/*2017-05-09 demo one*/

document.addEventListener('DOMContentLoaded', function() {

	// script gets the src attribute based on ID of page's script element:
	var requestURL = document.getElementById("mpChatBoxv1").getAttribute("src");
	// next use substring() to get querystring part of src
	var queryString = requestURL.substring(requestURL.indexOf("?") + 1, requestURL.length);
	// Next split the querystring into array
	var params = queryString.split("&");
	// Next loop through params
	var hdCompanyId = params[0].substring(params[0].indexOf("=") + 1, params[0].length);

	// ************************ CONNECT CHAT*****************************
	// connectSocketgsdagasdgasdg
	var checkConnectFalse = false;
	var socket;
	var urlSocket = "ws://192.168.20.242:8001/websocket";
	var baselinkServer;
	var sockets = [];
	var chathistory = [];
	var chatcontentunsigned = [];
	var sessionId;
	var customerId;
	var keyHistory;
	if (localStorage.getItem("chathistory") != null) {
		chathistory = JSON.parse(localStorage.getItem("chathistory"));
	}
	if (localStorage.getItem("sessionId") != null) {
		sessionId = localStorage.getItem("sessionId");
		customerId = localStorage.getItem("cusId");
	}
	if (localStorage.getItem("baselinkServer") != null) {
		baselinkServer = localStorage.getItem("baselinkServer");
	}
	// kiem tra khach hang nay da co id chua neu chua có thi tao id cho nó
	if (localStorage.getItem("cusId") == null || localStorage.getItem("cusId") == "undefined") {

		var day = new Date();
		localStorage.setItem("cusId", day.getTime());
	}

	var backgroupImage;
	connectSocket();

	Element.prototype.remove = function() {
		this.parentElement.removeChild(this);
	}
	NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
		for (var i = this.length - 1; i >= 0; i--) {
			if (this[i] && this[i].parentElement) {
				this[i].parentElement.removeChild(this[i]);
			}
		}
	}

	// For todays date;
	Date.prototype.today = function() {
		return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear();
	}

	// For the time now
	Date.prototype.timeNow = function() {
		return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
	}

	var $version = 'v01'

	var mpBoxChat = document.createElement("div");
	var panelminusToolsA = document.createElement("a");
	var panelTitleBoxChat = document.createElement("div");
	var paneltitle = document.createElement("h3");
	var panelTools = document.createElement("div");
	var panelDropdownTools = document.createElement("span");
	var faClassBolt = document.createElement("i");
	var faClassMinus = document.createElement("i");
	var panelminusTools = document.createElement("button");
	var bodyBoxChat = document.createElement("div");
	var bodyBoxChatContainer = document.createElement("div");
	var bodyBoxChatAgentAnswer = document.createElement("div");
	var bodyBoxChatAgentAnswerInfo = document.createElement("div");
	var bodyBoxChatAgentAnswerName = document.createElement("span");
	var bodyBoxChatAgentAnswerTime = document.createElement("span");
	var bodyBoxChatAgentAnswerimg = document.createElement("img");
	var bodyBoxChatAgentAnswerContent = document.createElement("div");

	var bodyBoxChatClientAnswer = document.createElement("div");
	var bodyBoxChatClientAnswerInfo = document.createElement("div");
	var bodyBoxChatClientAnswerName = document.createElement("span");
	var bodyBoxChatClientAnswerTime = document.createElement("span");
	var bodyBoxChatClientAnswerimg = document.createElement("i");
	var bodyBoxChatClientAnswerContent = document.createElement("div");

	var footerClent = document.createElement("div");
	var footerClentSpan = document.createElement("span");
	var footerClentForm = document.createElement("form");
	var footerClentFormContainer = document.createElement("div");
	var footerClentFormContainerInput = document.createElement("input");
	var footerClentFormContainerSpan = document.createElement("span");
	var footerClentFormContainerButton = document.createElement("Button");

	var footerClentFormContainerButton1 = document.createElement("span");
	footerClentFormContainerButton1.setAttribute('style', 'border-radius: 0;border-color: #d2d6de;background-color: #fff;padding: 2px 2px;font-size: 14px;font-weight: 400;line-height: 1;color: #555;text-align: center;width: 1%;white-space: nowrap;vertical-align: middle;border-collapse: separate;display: table-cell;');
	footerClentFormContainerButton1.setAttribute('id', 'inputfileClientSpan');
	var innerfooterClentFormContainerButton1 = document.createElement("span");
	innerfooterClentFormContainerButton1.setAttribute('id', 'openFile');
	innerfooterClentFormContainerButton1.setAttribute('class', 'fa fa-paperclip');
	innerfooterClentFormContainerButton1.setAttribute('style', 'margin-right:10px;')
	footerClentFormContainerButton1.appendChild(innerfooterClentFormContainerButton1);

	var innerfooterClentFormContainerInput = document.createElement("input");
	innerfooterClentFormContainerInput.setAttribute('type', 'file');
	innerfooterClentFormContainerInput.setAttribute('style', 'display:none;');
	innerfooterClentFormContainerInput.setAttribute('id', 'inputfileclient');
	footerClentFormContainerButton1.appendChild(innerfooterClentFormContainerInput);

	innerfooterClentFormContainerButton1.addEventListener("click", function() {
		Upload();

	});

	function Upload() {
		$("#inputfileclient").trigger("click");
	}
	;
	$(document).delegate("input:file", "change", function(event) {
		var files = event.target.files;
		var file = files[0];
		if (file != undefined) {
			var fd = new FormData();
			fd.append('file', file);
			$.ajax({
				url : baselinkServer + "/uploadFileChat/", // gửi ajax đến file
				type : "post", // chọn phương thức gửi là post
				dataType : "text", // dữ liệu trả về dạng text
				data : fd,
				async : false,
				cache : false,
				contentType : false,
				enctype : 'multipart/form-data',
				processData : false,
				success : function(result) {
					var results = result.replace('"', '');
					results = results.replace('"', '');
					var data = baselinkServer + results;
					var interval = setInterval(function() {
						$.ajax({
							url : data,
							type : 'HEAD',
							error : function() {
							},
							success : function() {
								var resultss = result.replace('"', '');
								resultss = resultss.replace('"', '');
								var historyj = {
									'content' : resultss,
									'type' : 'customer',
									'url' : "null"
								};
								chathistory.push(historyj);
								localStorage.setItem("chathistory", JSON.stringify(chathistory));
								sendMsg(resultss);
								console.log(resultss);
								// chatContent = regexLinkText(resultss);
								// generClientChatContent(chatContent);
								clearInterval(interval);
							}
						});
					}, 10000);
					$("input[type=file], textarea").val("");
				}
			});

		}
	});
	var linkCss = document.createElement("link");
	linkCss.setAttribute('rel', 'stylesheet');
	linkCss.setAttribute('type', 'text/css');
	linkCss.setAttribute('href', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
	document.body.appendChild(linkCss);

	var panelEventContainer = document.createElement("div");

	mpBoxChat.className += "mp-chatbox" + $version;
	// mpBoxChat.setAttribute('style', 'background: #25a55e;width: 310px;height: 420px;display: block;position: fixed;bottom: 0px;right: 20px;z-index: 99999999999999;box-sizing: content-box;box-shadow: 0 1px 6px rgba(149,71,45,0.5);border-top-color: #f39c12;border-top-left-radius: 3px;border-top-right-radius: 3px;');

	function myFunction(x) {
		if (x.matches) { // If media query matches
			mpBoxChat.setAttribute('style', 'background: #572700; width: 200px; height: 420px; display: block; position: fixed; bottom: -380px; right: 20px; z-index: 2147483647; box-sizing: content-box; box-shadow: rgba(149, 71, 45, 0.5) 0px 1px 6px; border-top-color: rgb(243, 156, 18); border-top-left-radius: 3px; border-top-right-radius: 3px;');
		} else {
			mpBoxChat.setAttribute('style', 'background: #572700; width: 310px; height: 420px; display: block; position: fixed; bottom: -380px; right: 20px; z-index: 2147483647; box-sizing: content-box; box-shadow: rgba(149, 71, 45, 0.5) 0px 1px 6px; border-top-color: rgb(243, 156, 18); border-top-left-radius: 3px; border-top-right-radius: 3px;');
		}
	}

	var x = window.matchMedia("(max-width: 700px)")
	myFunction(x)

	document.body.appendChild(mpBoxChat);

	panelTitleBoxChat.style.color = "#444";
	panelTitleBoxChat.style.display = "block";
	// change padding hỗ trợ trực tuyến
	panelTitleBoxChat.style.padding = "10px";
	panelTitleBoxChat.style.position = "relative";
	panelminusToolsA.appendChild(panelTitleBoxChat);

	paneltitle.style.display = "inline-block";
	paneltitle.style.fontSize = "18px";
	paneltitle.style.margin = "0";
	paneltitle.style.lineHeight = "1";
	paneltitle.style.color = "#ffffff";
	var textPaneltitle = document.createTextNode("Hỗ trợ trực truyến");
	paneltitle.appendChild(textPaneltitle);
	panelTitleBoxChat.appendChild(paneltitle);

	panelTools.setAttribute('style', 'position: absolute; right: 10px; top:5px; float: right!important');
	panelTitleBoxChat.appendChild(panelTools);

	panelDropdownTools.setAttribute('style', 'cursor: pointer; background-color: #00a65a !important;position: relative;display: inline-block;min-width: 10px;padding: 3px 7px;font-size: 12px;font-weight: 700;line-height: 1;color: #fff;text-align: center;white-space: nowrap;vertical-align: middle;border-radius: 10px;');
	// panelTools.appendChild(panelDropdownTools); tạm thời

	panelEventContainer.setAttribute('style', 'display: none;position: absolute;background-color: #fff;min-width: 100px;overflow: auto;border: 1px solid #eee;right: 0;z-index: 1;color: black;right: 30px;border-top-left-radius: 5px;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;');
	panelTools.appendChild(panelEventContainer);
	panelDropdownTools.addEventListener("click", function() {
		panelEventContainer.classList.toggle("show");
	});

	var linkEventPanel1 = document.createElement("a");
	linkEventPanel1.setAttribute('style', 'color: #f1aa3a;padding: 0px 1px 0px 4px;;text-decoration: none;display: block;font-weight: 600;font-family: inherit;');
	var textLinkEventPanel1 = document.createTextNode("Lịch sử");
	linkEventPanel1.appendChild(textLinkEventPanel1);
	linkEventPanel1.setAttribute('href', '#');

	var linkEventPanel2 = document.createElement("a");
	linkEventPanel2.setAttribute('style', 'color: #f1aa3a;padding: 0px 1px 0px 4px;;text-decoration: none;display: block;font-weight: 600;font-family: inherit;');
	var textLinkEventPanel2 = document.createTextNode("Lưu lịch sử chat");
	linkEventPanel2.appendChild(textLinkEventPanel2);
	linkEventPanel2.setAttribute('href', '#');
	var linkEventPanel3 = document.createElement("a");
	linkEventPanel3.setAttribute('style', 'color: #f1aa3a;padding: 0px 1px 0px 4px;;text-decoration: none;display: block;font-weight: 600;font-family: inherit;');
	var textLinkEventPanel3 = document.createTextNode("kết thúc");
	linkEventPanel3.appendChild(textLinkEventPanel3);
	linkEventPanel3.setAttribute('href', '#');

	panelEventContainer.appendChild(linkEventPanel1);
	panelEventContainer.appendChild(linkEventPanel2);
	panelEventContainer.appendChild(linkEventPanel3);

	faClassBolt.className += "fa fa-bolt";
	panelDropdownTools.appendChild(faClassBolt);

	panelTools.appendChild(panelminusTools);
	panelminusTools.setAttribute('style', 'border-radius: 3px;box-shadow: none;border: 1px solid transparent;font-size: 12px;background: transparent;color: #97a0b3;display: inline-block;font-weight: 400;line-height: 1.42857143;text-align: center;white-space: nowrap;vertical-align: middle;margin-bottom: 0;')

	faClassMinus.className += "fa fa-minus";
	panelminusTools.appendChild(faClassMinus);

	panelminusToolsA.addEventListener("click", function() {
		if (mpBoxChat.style.bottom == "-380px") {
			mpBoxChat.style.bottom = "0px";
		} else {
			mpBoxChat.style.bottom = "-380px";
		}

		footerClentFormContainerButton.innerText = "Gửi";
		footerClentSpan.innerText = "";
		boxChatTitleEndChatLink.setAttribute('style', 'Margin-left: 4px; color: red;display:inline');
		footerClentFormContainerInput.removeAttribute("disabled");

		panelEventContainer.classList.remove("show");
	});
	mpBoxChat.appendChild(panelminusToolsA);

	bodyBoxChat.setAttribute('style', 'background-color:white;border-bottom-right-radius: 0;border-bottom-left-radius: 0;position: relative;overflow-x: hidden;padding: 0;border-top-left-radius: 0;border-top-right-radius: 0;box-sizing: border-box;    border-top: 1px solid #f4f4f4;')
	bodyBoxChat.setAttribute('aaaa', '2222')
	mpBoxChat.appendChild(bodyBoxChat);

	var styleMp = document.createElement("style");
	var styleMpContent = document.createTextNode('.mp-chatbox' + $version + '-scroll::-webkit-scrollbar {width: 6px;}.mp-chatbox' + $version + '-scroll::-webkit-scrollbar-track {-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.3);border-radius: 2px;}.mp-chatbox' + $version + '-scroll::-webkit-scrollbar-thumb {border-radius: 2px;-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.5);}');
	// mpBoxChat.setAttribute('style', 'background: #25a55e;width: 310px;height: 420px;display: block;position: fixed;bottom: 0px;right: 20px;z-index: 99999999999999;box-sizing: content-box;box-shadow: 0 1px 6px rgba(149,71,45,0.5);border-top-color: #f39c12;border-top-left-radius: 3px;border-top-right-radius: 3px;');
	styleMp.appendChild(styleMpContent);
	mpBoxChat.appendChild(styleMp);

	// -------------------------------Direct login
	var bodyDirectLoginContainer = document.createElement("div");
	var bodyDirectLoginContainerBackgroud = document.createElement("div");
	var bodyDirectLoginNameContainer = document.createElement("div");

	var bodyDirectLoginTitle = document.createElement("div");
	var bodyDirectLoginTitleContainer = document.createElement("div");
	var bodyDirectLoginTitleContainerLogo = document.createElement("img");
	var bodyDirectLoginTitleContainerBr = document.createElement("br");
	var bodyDirectLoginTitleContainerBr2 = document.createElement("br");
	var bodyDirectLoginTitleContainerLogan = document.createElement("p");
	var bodyDirectLoginTitleContainerFreeText = document.createElement("p");

	var bodyDirectLoginName = document.createElement("input");
	var bodyDirectLoginEmail = document.createElement("input");
	var bodyDirectLoginChanel = document.createElement("select");
	var bodyDirectLoginButtonContainer = document.createElement("div");
	var bodyDirectLoginContainerAlert = document.createElement("span");
	var bodyDirectLoginButton = document.createElement("button");

	bodyDirectLoginContainer.setAttribute('style', 'background-image: url("' + backgroupImage + '"); transform: translate(0%, 0);position: absolute;top: 40px;bottom: 0;height: 380px;width: 100%;color: #333;overflow: hidden;transition: transform .5s ease-in-out;z-index: 10;');
	mpBoxChat.appendChild(bodyDirectLoginContainer);

	bodyDirectLoginContainerBackgroud.setAttribute('style', 'height: 100%;background: #ffffff;');
	bodyDirectLoginContainer.appendChild(bodyDirectLoginContainerBackgroud)

	bodyDirectLoginTitle.setAttribute('style', 'text-align: center;padding-top: 10px;color: #fff;');
	bodyDirectLoginContainerBackgroud.appendChild(bodyDirectLoginTitle);

	bodyDirectLoginTitleContainer.setAttribute('style', 'padding: 0px 10px 0px 10px;');
	bodyDirectLoginTitle.appendChild(bodyDirectLoginTitleContainer);

	bodyDirectLoginTitleContainerLogo.setAttribute('style', 'height: 65px;');
	bodyDirectLoginTitleContainerLogo.setAttribute('src', 'https://facebook.com');
	bodyDirectLoginTitleContainerLogo.setAttribute('alt', 'MP');
	// bodyDirectLoginTitleContainerLogo.appendChild(bodyDirectLoginTitleContainerLogo);
	// var textLogo = document.createTextNode("MP telecom");
	// bodyDirectLoginTitleContainerLogo.appendChild(textLogo);
	bodyDirectLoginTitleContainer.appendChild(bodyDirectLoginTitleContainerLogo);

	bodyDirectLoginTitleContainer.appendChild(bodyDirectLoginTitleContainerBr);
	bodyDirectLoginTitleContainer.appendChild(bodyDirectLoginTitleContainerBr2);

	// bodyDirectLoginTitleContainerLogan.setAttribute('style', 'font-weight: 700;margin-bottom: 0px;color:#f36f21;');
	// var textLogan = document.createTextNode("Tôn trọng là thành công.");
	// bodyDirectLoginTitleContainerLogan.appendChild(textLogan);
	// bodyDirectLoginTitleContainer.appendChild(bodyDirectLoginTitleContainerLogan);

	bodyDirectLoginTitleContainerFreeText.setAttribute('style', 'font-weight: 700;color:#555;');
	var textFree = document.createTextNode("Chúng tôi hân hạnh được phục vụ bạn 24/7.");
	bodyDirectLoginTitleContainerFreeText.appendChild(textFree);
	bodyDirectLoginTitleContainer.appendChild(bodyDirectLoginTitleContainerFreeText);

	// phần liên hệ
	var bodyLoginContact = document.createElement("div");
	bodyLoginContact.setAttribute('style', 'position: absolute;bottom: 0px;width: 100%;margin-left:3px');
	bodyDirectLoginContainer.appendChild(bodyLoginContact);

	var bodyLoginContactFacebook = document.createElement("span");
	bodyLoginContactFacebook.setAttribute('style', 'float: left;bottom: 0px;position: absolute;');
	bodyLoginContact.appendChild(bodyLoginContactFacebook);

	var bodyLoginContactFacebookLink = document.createElement("a");
	bodyLoginContactFacebookLink.setAttribute('style', 'color: #3b5998');
	bodyLoginContactFacebookLink.setAttribute('href', 'https://minhphuc/lienhe');
	bodyLoginContactFacebookLink.setAttribute('target', '_blank');
	bodyLoginContactFacebook.appendChild(bodyLoginContactFacebookLink);

	var SpanContactContactText = document.createElement("span");
	SpanContactContactText.setAttribute('style', 'font-size: 12px;color: #555;');
	var SpanContactContactTextText = document.createTextNode(" Gọi Cho Chúng Tôi!");
	SpanContactContactText.appendChild(SpanContactContactTextText);
	bodyLoginContactFacebookLink.appendChild(SpanContactContactText);

	bodyBoxChatAgentAnswer.setAttribute('style', 'margin-bottom: 5px;display: block;border-bottom: 1px solid #f4f4f4;');
	bodyBoxChat.appendChild(bodyBoxChatAgentAnswer);

	bodyBoxChatContainer.setAttribute('style', 'transition: transform .5s ease-in-out;transform: translate(0, 0);padding: 0px 5px 5px 5px;height: 230px;overflow:inherit;');
	bodyBoxChatContainer.className += "mp-chatbox" + $version + "-scroll";
	bodyBoxChat.appendChild(bodyBoxChatContainer);

	bodyBoxChatAgentAnswerimg.setAttribute('style', 'border-radius: 50%;float: left;width: 60px;height: 60px;vertical-align: middle;');
	bodyBoxChatAgentAnswerimg.setAttribute('src', '');
	bodyBoxChatAgentAnswerimg.setAttribute('alt', 'Message User Image');
	bodyBoxChatAgentAnswer.appendChild(bodyBoxChatAgentAnswerimg);

	bodyBoxChatAgentAnswerContent.setAttribute('style', 'border-radius: 10px;position: relative;margin: 1px 0 0 60px;color: #444;border: solid transparent;content: " ";');
	bodyBoxChatAgentAnswer.appendChild(bodyBoxChatAgentAnswerContent);

	var boxChatTitleAgentInfoNameContainer = document.createElement("p");
	boxChatTitleAgentInfoNameContainer.setAttribute('style', 'font-size: 15px;font-weight: 700;color: #da4b38;margin: 0;');
	var boxChatTitleAgentInfoNameText = document.createTextNode("Hỗ Trợ Khách Hàng");
	boxChatTitleAgentInfoNameContainer.appendChild(boxChatTitleAgentInfoNameText);
	bodyBoxChatAgentAnswerContent.appendChild(boxChatTitleAgentInfoNameContainer);

	var boxChatTitleAgentInfoChanelContainer = document.createElement("p");
	boxChatTitleAgentInfoChanelContainer.setAttribute('style', 'font-size: 12px;margin: 0;');
	var boxChatTitleAgentInfoChanelText = document.createTextNode("Hỗ trợ khách hàng");
	boxChatTitleAgentInfoChanelContainer.appendChild(boxChatTitleAgentInfoChanelText);
	bodyBoxChatAgentAnswerContent.appendChild(boxChatTitleAgentInfoChanelContainer);

	var boxChatTitleAgentInfoVoteContainer = document.createElement("p");
	boxChatTitleAgentInfoVoteContainer.setAttribute('style', 'display: block;margin: 0;');
	bodyBoxChatAgentAnswerContent.appendChild(boxChatTitleAgentInfoVoteContainer);

	// Đánh giá tốt
	var boxChatTitleAgentInfoVoteUpLink = document.createElement("a");
	boxChatTitleAgentInfoVoteUpLink.setAttribute('href', '#');
	boxChatTitleAgentInfoVoteUpLink.setAttribute('style', 'color: blue');
	boxChatTitleAgentInfoVoteUpLink.setAttribute('title', 'Đánh giá tốt');
	boxChatTitleAgentInfoVoteContainer.appendChild(boxChatTitleAgentInfoVoteUpLink);

	// Kết thúc chát
	var boxChatTitleEndChatLink = document.createElement("a");
	boxChatTitleEndChatLink.setAttribute('style', 'Margin-left: 4px; color: red');
	boxChatTitleEndChatLink.setAttribute('title', 'Trực tuyến');
	boxChatTitleAgentInfoVoteContainer.appendChild(boxChatTitleEndChatLink);

	var iClassNoxChatTitleEndChatLink = document.createElement("i");
	iClassNoxChatTitleEndChatLink.setAttribute('class', 'fa fa-circle');
	iClassNoxChatTitleEndChatLink.setAttribute('style', 'color:#64bd63');
	boxChatTitleEndChatLink.appendChild(iClassNoxChatTitleEndChatLink);

	var iClassNoxChatTitleEndChatLinkContent = document.createElement("font");
	iClassNoxChatTitleEndChatLink.appendChild(iClassNoxChatTitleEndChatLinkContent);
	// boxChatTitleEndChatLink.addEventListener("click", function() {
	// customerEndChat(sessionId);
	// // panelminusTools.click();

	// footerClentSpan.setAttribute('style', 'color: rgb(249, 58, 58); border-radius: 5px; padding: 2px; position: relative; font-weight: 700;')
	// footerClentSpan.innerText = "Phiên chat đã kết thúc !";
	// footerClentFormContainerButton.innerText = "Phiên chat mới";
	// boxChatTitleEndChatLink.setAttribute('style', 'Margin-left: 4px; color: red;display:none');
	// footerClentFormContainerInput.setAttribute('disabled', true);

	// });
	// ---------------------------

	// Direct Login
	bodyDirectLoginNameContainer.setAttribute('style', 'padding: 0px 20px 0px 20px');
	bodyDirectLoginContainerBackgroud.appendChild(bodyDirectLoginNameContainer);

	bodyDirectLoginName.setAttribute('style', 'border: 1px solid #ccc;border-bottom: none;border-top-right-radius: 3px;border-top-left-radius: 3px;box-shadow: none;border-color: #d2d6de;-webkit-appearance: none;display: block;width: 100%;height: 34px;padding: 6px 12px;font-size: 14px;line-height: 1.42857143;color: #555;background-color: #fff;background-image: none;transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;');
	bodyDirectLoginName.setAttribute('placeholder', 'Họ tên');
	bodyDirectLoginName.setAttribute('type', 'hidden');
	bodyDirectLoginNameContainer.appendChild(bodyDirectLoginName);

	bodyDirectLoginEmail.setAttribute('style', 'border: 1px solid #ccc;border-bottom: none;border-radius: 0;box-shadow: none;border-color: #d2d6de;-webkit-appearance: none;display: block;width: 100%;height: 34px;padding: 6px 12px;font-size: 14px;line-height: 1.42857143;color: #555;background-color: #fff;background-image: none;transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;');
	bodyDirectLoginEmail.setAttribute('placeholder', 'Email');
	bodyDirectLoginEmail.setAttribute('type', 'hidden');
	bodyDirectLoginNameContainer.appendChild(bodyDirectLoginEmail);

	bodyDirectLoginChanel.setAttribute('style', 'border: 1px solid #ccc; border-bottom:none; box-shadow: none;border-color: #d2d6de;-webkit-appearance: none;display: block;width: 100%;height: 34px;padding: 6px 12px !important;font-size: 14px;line-height: 1.42857143;color: #555;background-color: #fff;background-image: none;transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;');
	bodyDirectLoginNameContainer.appendChild(bodyDirectLoginChanel);

	var firstChatContentClient_WhenSelectQueue = document.createElement("textarea");
	firstChatContentClient_WhenSelectQueue.setAttribute('style', 'resize: none; overflow:hidden; border: 1px solid #ccc;border-bottom-left-radius: 3px;border-bottom-right-radius: 3px;box-shadow: none;border-color: #d2d6de;-webkit-appearance: none;display: block;width: 100%;padding: 6px 12px !important;font-size: 14px;line-height: 1.42857143;color: #555;background-color: #fff;background-image: none;transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;');
	firstChatContentClient_WhenSelectQueue.setAttribute('rows', 2);
	firstChatContentClient_WhenSelectQueue.setAttribute('placeholder', 'Nhập thông tin cần hỗ trợ (tối đa 255 ký tự).');
	bodyDirectLoginNameContainer.appendChild(firstChatContentClient_WhenSelectQueue);

	bodyDirectLoginContainerAlert.setAttribute('style', 'color:#f93a3a;border-radius: 5px;padding: 2px;position: relative;font-weight: 700;');
	var textAlert = document.createTextNode("");
	bodyDirectLoginContainerAlert.appendChild(textAlert);
	bodyDirectLoginNameContainer.appendChild(bodyDirectLoginContainerAlert);

	bodyDirectLoginButton.setAttribute('style', 'margin-top:10px;box-shadow: none;border-width: 1px;border-radius: 0;background-color: #25a55e;border-color: #3b90c4;border: 1px solid transparent;color: #fff;display: block;width: 100%;padding: 6px 12px;margin-bottom: 0;font-size: 14px;font-weight: 400;line-height: 1.42857143;text-align: center;white-space: nowrap;vertical-align: middle;touch-action: manipulation;cursor: pointer;user-select: none;background-image: none;');
	bodyDirectLoginButton.setAttribute('type', 'button');
	var textButtonLogin = document.createTextNode("Bắt đầu trò chuyện");
	bodyDirectLoginButton.appendChild(textButtonLogin);
	bodyDirectLoginNameContainer.appendChild(bodyDirectLoginButton);
	bodyDirectLoginButton.addEventListener("click", function() {
		var cus = getInfoToCheckLogin();
		var queue = bodyDirectLoginChanel[bodyDirectLoginChanel.selectedIndex].value;
		if (cus == false || queue == '' || queue == '0')
			return;
		if (localStorage.getItem("cusName") != null) {
			loginWithcusName(cus, queue);
		} else {
			login(cus, queue);
		}
		localStorage.setItem('cusemail', cus.email);
		// neu login thi update truong login thanh true
		localStorage.setItem("login", "true");
		bodyDirectLoginButton.innerText = "Đang kết nối đến hỗ trợ viên.";
		bodyDirectLoginButton.setAttribute('disabled', 'disabled');
		bodyDirectLoginContainerAlert.innerText = "";
		// var checkingConnect = connectSocket();
	});
	// Lấy thông tin login
	function getInfoToCheckLogin() {
		var customer = new Object();

		customer.hostname = window.location.hostname;
		if (localStorage.getItem("cusName") != null) {
			customer.name = localStorage.getItem("cusName");
		} else {
			customer.name = window.location.hostname;
		}

		customer.email = "email" + new Date().getTime() + "@gmail.com";
		customer.companyId = hdCompanyId;
		customer.msgClient = firstChatContentClient_WhenSelectQueue.value;
		var queue = bodyDirectLoginChanel[bodyDirectLoginChanel.selectedIndex].value;
		customer.queue = queue;

		if (customer.name === '') {
			$(bodyDirectLoginContainerAlert).show();
			bodyDirectLoginContainerAlert.innerText = "Bạn vui lòng nhập họ tên !";
			$(bodyDirectLoginContainerAlert).delay(4000).hide('slow');
			return false;
		}
		if (customer.email === '') {
			$(bodyDirectLoginContainerAlert).show();
			bodyDirectLoginContainerAlert.innerText = "Bạn vui lòng nhập email !";
			$(bodyDirectLoginContainerAlert).delay(4000).hide('slow');
			return false;
		} else {
			if (!validateEmail(customer.email)) {
				$(bodyDirectLoginContainerAlert).show();
				bodyDirectLoginContainerAlert.innerText = "Email không hợp lệ, vui lòng nhập lại !";
				$(bodyDirectLoginContainerAlert).delay(4000).hide('slow');
				return false;
			}
		}
		if (customer.queue === '0') {
			$(bodyDirectLoginContainerAlert).show();
			bodyDirectLoginContainerAlert.innerText = "Bạn vui lòng chọn kênh hỗ trợ !";
			$(bodyDirectLoginContainerAlert).delay(4000).hide('slow');
			return false;
		}
		if (customer.msgClient == '') {
			$(bodyDirectLoginContainerAlert).show();
			bodyDirectLoginContainerAlert.innerText = "Bạn vui lòng nhập thông tin cần hỗ trợ !";
			$(bodyDirectLoginContainerAlert).delay(4000).hide('slow');
			return false;
		} else if (customer.msgClient != '' && customer.msgClient.length > 255) {
			$(bodyDirectLoginContainerAlert).show();
			bodyDirectLoginContainerAlert.innerText = "Thông tin hỗ trợ vượt quá ký tự cho phép !";
			$(bodyDirectLoginContainerAlert).delay(4000).hide('slow');
			return false;
		}

		if (customer.name !== '' && customer.email !== '' && customer.queue !== '' && customer.queue !== '0' && customer.msgClient !== '') {
			return customer;
		} else
			return false;
	}

	function getInfoCustomerLgoin() {
		var customer = new Object();
		customer.name = window.location.hostname;
		customer.email = "email" + new Date().getTime() + "@gmail.com";
	}

	// Function that validates email address through a regular expression.
	function validateEmail(sEmail) {
		var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
		if (filter.test(sEmail)) {
			return true;
		} else {
			return false;
		}
	}

	footerClent.setAttribute('style', 'border-top-left-radius: 0;border-top-right-radius: 0;border-bottom-right-radius: 3px;border-bottom-left-radius: 3px;border-top: 1px solid #f4f4f4;padding: 10px;background-color: #fff;');
	mpBoxChat.appendChild(footerClent);

	footerClentSpan.setAttribute('style', 'color:#f93a3a;border-radius: 5px;padding: 2px;position: relative;font-weight: 700;');
	var footerTextAlert = document.createTextNode("");
	footerClentSpan.appendChild(footerTextAlert);
	footerClent.appendChild(footerClentSpan);

	footerClentFormContainer.setAttribute('style', 'position: relative;display: table;border-collapse: separate;');
	footerClent.appendChild(footerClentFormContainer);

	footerClentFormContainer.appendChild(footerClentFormContainerButton1);

	footerClentFormContainerInput.setAttribute('style', 'border-radius: float:left; 0;box-shadow: none;border-color: #d2d6de;display: block;width: 100%;height: 34px;padding: 6px 12px;font-size: 14px;line-height: 1.42857143;color: #555;background-color: #fff;background-image: none;border: 1px solid #ccc;-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);box-shadow: inset 0 1px 1px rgba(0,0,0,.075);-webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;-o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;');
	footerClentFormContainerInput.setAttribute('type', 'text');
	footerClentFormContainerInput.setAttribute('name', 'message');
	footerClentFormContainerInput.setAttribute('placeholder', 'Nhập nội dung chat ...');
	footerClentFormContainer.appendChild(footerClentFormContainerInput);
	footerClentFormContainerInput.addEventListener("keyup", function(event) {

		event.preventDefault();
		var textButton = footerClentFormContainerButton.innerText;
		if (event.keyCode == 13) {
			// Client gửi chat lên server
			var chatContent = this.value;
			if (chatContent != '' && chatContent.length > 255) {
				$(footerClentSpan).show();
				footerClentSpan.innerText = "Bạn đã nhập quá ký tự cho phép !";
				$(footerClentSpan).delay(4000).hide('slow');
				return false;
			} else if (chatContent !== '') {
				var historyj = {
					'content' : chatContent,
					'type' : 'customer',
					'url' : "null"
				};
				chathistory.push(historyj);
				localStorage.setItem("chathistory", JSON.stringify(chathistory));
				if (localStorage.getItem("firstMessage") == null) {
					localStorage.setItem("firstMessage", chatContent);
				}
				$(footerClentSpan).hide();
				// localStorage.getItem("customerName");
				// check khach hàng đã login chưa nếu chưa login thì login
				if (localStorage.getItem("login") == "false") {
					localStorage.setItem('login', 'true');
					var customer = new Object();
					customer.hostname = window.location.hostname;
					if (localStorage.getItem("cusName") != null) {
						customer.name = localStorage.getItem("cusName");
					} else {
						customer.name = window.location.hostname;
					}
					customer.email = "email" + new Date().getTime() + "@gmail.com";
					customer.companyId = hdCompanyId;
					customer.msgClient = chatContent;
					customer.queue = localStorage.getItem('queueid');
					if (localStorage.getItem('cusName') != null) {
						loginWithcusName(customer, localStorage.getItem('queueid'));
					} else {
						login(customer, localStorage.getItem('queueid'));
					}

					(function(w, d, s, l, i) {
						w[l] = w[l] || [];
						w[l].push({
							'gtm.start' : new Date().getTime(),
							event : 'gtm.js'
						});
						var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
						j.async = true;
						j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
						f.parentNode.insertBefore(j, f);
					})(window, document, 'script', 'dataLayer', 'GTM-N28KRX3');

				} else if (localStorage.getItem("sessionId") != null) {
					sendMsg(chatContent);
				} else if (localStorage.getItem("sessionId") == null) {
					var content = {
						"content" : chatContent
					};
					if (localStorage.getItem("chatcontentunsigned") != null) {
						chatcontentunsigned = JSON.parse(localStorage.getItem("chatcontentunsigned"));
					}
					chatcontentunsigned.push(content)
					localStorage.setItem("chatcontentunsigned", JSON.stringify(chatcontentunsigned));
					localStorage.setItem("sendChatcontent", true);
					sendMsgWait(chatContent);
				}
				console.log(chatContent);
				this.value = '';
			} else if (textButton == "Phiên chat mới") {
				footerClentFormContainerButton.innerText = "Gửi";
				footerClentSpan.innerText = "";
				boxChatTitleEndChatLink.setAttribute('style', 'Margin-left: 4px; color: red;display:inline');
				footerClentFormContainerInput.removeAttribute("disabled");

				var mp_agent_answer = document.getElementsByClassName('mp-agent-answer' + $version);
				var mp_client_answer = document.getElementsByClassName('mp-client-answer' + $version);
				if (mp_agent_answer.length === 0 && mp_client_answer.length === 0) {
					bodyDirectLoginButton.innerText = "Bắt đầu trò chuyện";
					bodyDirectLoginButton.removeAttribute("disabled");
				}
				mp_client_answer.remove();
				mp_agent_answer.remove();
				bodyDirectLoginContainer.style.transform = 'translate(0%, 0)';
			}
		}
	});

	footerClentFormContainerSpan.setAttribute('style', 'position: relative;font-size: 0;white-space: nowrap;width: 1%;vertical-align: middle;display: table-cell;');
	footerClentFormContainer.appendChild(footerClentFormContainerSpan);

	var textFooterClentFormContainerButton = document.createTextNode("Gửi");
	footerClentFormContainerButton.appendChild(textFooterClentFormContainerButton);
	footerClentFormContainerButton.setAttribute('style', 'z-index: 2;margin-left: -1px;border-top-left-radius: 0;border-bottom-left-radius: 0;box-shadow: none;border-width: 1px;border-radius: 0;position: relative;background-color: #f39c12;border-color: #f39c12;border: 1px solid transparent;color: #fff;display: inline-block;padding: 6px 12px;margin-bottom: 0;font-size: 14px;font-weight: 400;line-height: 1.42857143;text-align: center;white-space: nowrap;vertical-align: middle;touch-action: manipulation;user-select: none;background-image: none;font-family: inherit;margin: 0;cursor: pointer;overflow: visible;text-transform: none;text-indent: 0px;text-shadow: none;align-items: flex-start;');
	footerClentFormContainerButton.setAttribute('type', 'submit');
	footerClentFormContainerSpan.appendChild(footerClentFormContainerButton);

	footerClentFormContainerButton.addEventListener("click", function() {

		var textButton = footerClentFormContainerButton.innerText;
		var chatContent = footerClentFormContainerInput.value;
		if (chatContent != '' && chatContent.length > 255) {
			$(footerClentSpan).show();
			footerClentSpan.innerText = "Bạn đã nhập quá ký tự cho phép !";
			$(footerClentSpan).delay(4000).hide('slow');
			return false;
		} else if (chatContent !== '') {
			var historyj = {
				'content' : chatContent,
				'type' : 'customer',
				'url' : "null"
			};
			chathistory.push(historyj);
			localStorage.setItem("chathistory", JSON.stringify(chathistory));
			if (localStorage.getItem("firstMessage") == null) {
				localStorage.setItem("firstMessage", chatContent);
			}

			$(footerClentSpan).hide();
			// Client gửi chat lên server
			if (localStorage.getItem("login") == "false") {
				localStorage.setItem('login', 'true');
				var customer = new Object();
				customer.hostname = window.location.hostname;
				if (localStorage.getItem("cusName") != null) {
					customer.name = localStorage.getItem("cusName");
				} else {
					customer.name = window.location.hostname;
				}
				customer.email = "email" + new Date().getTime() + "@gmail.com";
				customer.companyId = hdCompanyId;
				customer.msgClient = chatContent;
				customer.queue = localStorage.getItem('queueid');
				if (localStorage.getItem('cusName') != null) {
					loginWithcusName(customer, localStorage.getItem('queueid'));
				} else {
					login(customer, localStorage.getItem('queueid'));
				}

			} else if (localStorage.getItem("sessionId") != null) {
				sendMsg(chatContent);
			} else if (localStorage.getItem("sessionId") == null) {
				var content = {
					"content" : chatContent
				};
				chatcontentunsigned.push(content)
				localStorage.setItem("chatcontentunsigned", JSON.stringify(chatcontentunsigned));
				// fill tin nhắn
				generClientChatContent(chatContent);
			}
			console.log(chatContent);
			// chatContent = regexLinkText(chatContent);
			// generClientChatContent(chatContent);
			footerClentFormContainerInput.value = '';
		} else if (textButton == "Phiên chat mới") {
			footerClentFormContainerButton.innerText = "Gửi";
			footerClentSpan.innerText = "";
			boxChatTitleEndChatLink.setAttribute('style', 'Margin-left: 4px; color: red;display:inline');
			footerClentFormContainerInput.removeAttribute("disabled");

			var mp_agent_answer = document.getElementsByClassName('mp-agent-answer' + $version);
			var mp_client_answer = document.getElementsByClassName('mp-client-answer' + $version);
			if (mp_agent_answer.length === 0 && mp_client_answer.length === 0) {
				bodyDirectLoginButton.innerText = "Bắt đầu trò chuyện";
				bodyDirectLoginButton.removeAttribute("disabled");
			}
			mp_client_answer.remove();
			mp_agent_answer.remove();
			// bodyDirectLoginContainer.style.transform = 'translate(0%, 0)';
			// kiểm tra số queue có nếu có nhiều quue thì quay về màn hình chọn qeue nếu không thì gui len lenh lay cau chao
			if (localStorage.getItem("soqueue") == 1) {
				getQueueClient();
			} else if (localStorage.getItem("soqueue") > 1) {
				// tra ve man hinh chon queue ban dau va cho no chọn nhóm chat
				getQueueClient();
				bodyDirectLoginContainer.style.transform = 'translate(0%, 0)';
			}

		} else if (textButton == "Kết nối lại") {
			// update login là true, đồng thời gửi event login chat lên
			localStorage.setItem("login", 'true');
			var customer = new Object();
			if (localStorage.getItem("cusName") != null) {
				customer.name = localStorage.getItem("cusName");
			} else {
				customer.name = window.location.hostname;
			}

			customer.email = "email" + new Date().getTime() + "@gmail.com";
			customer.companyId = hdCompanyId;
			customer.msgClient = localStorage.getItem("firstMessage");
			customer.queue = localStorage.getItem('queueid');
			if (localStorage.getItem('cusName') != null) {
				loginWithcusName(customer, localStorage.getItem('queueid'));
			} else {
				login(customer, localStorage.getItem('queueid'));
			}

			// set lại button kết nối lại thành gửi đồng thời set lại opacity
			footerClentFormContainerButton.innerText = "Gửi";
			bodyBoxChatContainer.style.opacity = "1";
			footerClentSpan.innerText = "";
		}
	});

	// Phần contact khi đã login
	var contactContainer = document.createElement('div');
	var contactContainerLeft = document.createElement('span');
	var contactContainerLeftFBLink = document.createElement('a');
	var contactContainerLeftFBLinkIclass = document.createElement('i');
	var contactContainerLeftFBLinkSpan = document.createElement('i');
	var contactContainerLeftFBLinkSpanText = document.createTextNode(' Gọi cho chúng tôi !');

	contactContainer.setAttribute('style', 'position: relative;background: #eee;width: 100%;height: 100%;');
	contactContainerLeft.setAttribute('style', 'float: left;position: relative;line-height: 1.83543;width: 100%;');
	contactContainerLeftFBLink.setAttribute('style', 'color: #3b5998;');
	contactContainerLeftFBLink.setAttribute('href', 'tel:0869510936');
	contactContainerLeftFBLink.setAttribute('target', '_blank');
	// contactContainerLeftFBLinkIclass.setAttribute('class', 'fa fa-facebook-square');
	contactContainerLeftFBLinkSpan.setAttribute('style', 'font-size: 11px;color: #1d0505;');
	contactContainerLeftFBLinkSpan.appendChild(contactContainerLeftFBLinkSpanText);
	mpBoxChat.appendChild(contactContainer);
	contactContainer.appendChild(contactContainerLeft);
	contactContainerLeft.appendChild(contactContainerLeftFBLink);
	contactContainerLeftFBLink.appendChild(contactContainerLeftFBLinkIclass);
	contactContainerLeftFBLink.appendChild(contactContainerLeftFBLinkSpan);
	// contactContainerLeft.appendChild(contactContainerRightLink);
	// contactContainerRightLink.appendChild(contactContainerRightLinkIclass);
	// ------------------------------------------------------

	function sayHelloCustomer(strHelo, url) {
		strHelo = regexLinkText(strHelo);
		var newDate = new Date();
		var datetime = newDate.today() + " " + newDate.timeNow();

		var bodyBoxChatAgentAnswer = document.createElement("div");
		var bodyBoxChatAgentAnswerInfo = document.createElement("div");
		var bodyBoxChatAgentAnswerName = document.createElement("span");
		var bodyBoxChatAgentAnswerTime = document.createElement("span");
		var bodyBoxChatAgentAnswerimg = document.createElement("img");
		var bodyBoxChatAgentAnswerContent = document.createElement("div");

		bodyBoxChatAgentAnswer.setAttribute('style', 'margin-bottom: 10px;display: block;');
		bodyBoxChatAgentAnswer.setAttribute('class', 'mp-agent-answer' + $version);
		bodyBoxChatContainer.appendChild(bodyBoxChatAgentAnswer);

		bodyBoxChatAgentAnswerInfo.setAttribute('style', 'display: table;font-size: 12px;box-sizing: border-box;width: 100%;');
		bodyBoxChatAgentAnswer.appendChild(bodyBoxChatAgentAnswerInfo);
		bodyBoxChatAgentAnswerName.setAttribute('style', 'font-weight: 600;float: left!important;font-size: 12px;');
		bodyBoxChatAgentAnswerInfo.appendChild(bodyBoxChatAgentAnswerName);

		bodyBoxChatAgentAnswerTime.setAttribute('style', 'color: #999;float: right!important;font-size: 11px;');
		bodyBoxChatAgentAnswerInfo.appendChild(bodyBoxChatAgentAnswerTime);

		bodyBoxChatAgentAnswerimg.setAttribute('style', 'border-radius: 50%;float: left;width: 35px;height: 35px;vertical-align: middle;');
		bodyBoxChatAgentAnswerimg.setAttribute('src', url);
		bodyBoxChatAgentAnswerimg.setAttribute('alt', 'Message User Image');
		bodyBoxChatAgentAnswer.appendChild(bodyBoxChatAgentAnswerimg);

		bodyBoxChatAgentAnswerContent.setAttribute('style', 'border-radius: 5px;position: relative;margin: 1px 0 0 45px;background: #ececec;color: #444;   border: solid transparent;content: " ";font-size: 14px;word-break: break-word;margin-right: 0;margin-left: 10px;display: inline-table;');
		bodyBoxChatAgentAnswer.appendChild(bodyBoxChatAgentAnswerContent);

		// var agentAnswer = document.createTextNode(strHelo);
		var agentAnswer = bodyBoxChatAgentAnswerContent.insertAdjacentHTML('beforeend', strHelo);
		// bodyBoxChatAgentAnswerContent.appendChild(agentAnswer);
		bodyBoxChatContainer.scrollTop = bodyBoxChatContainer.scrollHeight;
	}

	function generClientChatContent(chatContent) {
		var bodyBoxChatClientAnswer = document.createElement("div");
		var bodyBoxChatClientAnswerInfo = document.createElement("div");
		var bodyBoxChatClientAnswerName = document.createElement("span");
		var bodyBoxChatClientAnswerTime = document.createElement("span");
		var bodyBoxChatClientAnswerimg = document.createElement("i");
		var bodyBoxChatClientAnswerContent = document.createElement("div");

		bodyBoxChatClientAnswer.setAttribute('style', 'margin-bottom: 10px;display: block;');
		bodyBoxChatClientAnswer.setAttribute('class', 'mp-client-answer' + $version);
		bodyBoxChatContainer.appendChild(bodyBoxChatClientAnswer);

		bodyBoxChatClientAnswerInfo.setAttribute('style', 'display: table;font-size: 12px;width: 100%;');
		bodyBoxChatClientAnswer.appendChild(bodyBoxChatClientAnswerInfo);

		// var textBodyBoxChatClientAnswerName = document.createTextNode("haidanghd@gmail.com");
		// bodyBoxChatClientAnswerName.appendChild(textBodyBoxChatClientAnswerName);
		bodyBoxChatClientAnswerName.setAttribute('style', 'font-weight: 600;float: right!important;box-sizing: border-box;line-height: 1.42857143;font-size: 12px;');
		bodyBoxChatClientAnswerInfo.appendChild(bodyBoxChatClientAnswerName);

		var newDate = new Date();
		var datetime = newDate.today() + " " + newDate.timeNow();

		// var textBodyBoxChatClientAnswerTime = document.createTextNode(datetime);
		// bodyBoxChatClientAnswerTime.appendChild(textBodyBoxChatClientAnswerTime);
		bodyBoxChatClientAnswerTime.setAttribute('style', 'color: #999;box-sizing: border-box;float: left!important;font-size: 11px;');
		bodyBoxChatClientAnswerInfo.appendChild(bodyBoxChatClientAnswerTime);

		bodyBoxChatClientAnswerimg.setAttribute('style', 'float: right;width: 30px;height: 30px;border-radius: 50%;text-align: center;line-height: 30px;vertical-align: middle;border: 0;background-color: #00a65a !important;color: #fff !important;');
		bodyBoxChatClientAnswerimg.className += "fa fa-user";
		bodyBoxChatClientAnswer.appendChild(bodyBoxChatClientAnswerimg);

		// var textBodyBoxChatClientAnswerContent = document.createTextNode(chatContent);
		bodyBoxChatClientAnswerContent.insertAdjacentHTML('beforeend', chatContent);
		// bodyBoxChatClientAnswerContent.appendChild(textBodyBoxChatClientAnswerContent);
		bodyBoxChatClientAnswerContent.setAttribute('style', 'word-break: break-word;margin-right: 10px;margin-left: 0;border-radius: 5px;position: relative;border: 1px solid #f1aa3a;color: #fff;background: #f1aa3a;text-align: left;font-size: 14px; padding: 2px;float:right;');
		bodyBoxChatClientAnswer.appendChild(bodyBoxChatClientAnswerContent);

		bodyBoxChatContainer.scrollTop = bodyBoxChatContainer.scrollHeight;
	}

	// Bind list queue cho client
	function bindQueuesData(listQueueClient) {
		for (var i = 0; i < listQueueClient.length; i++) {
			var bodyDirectLoginChanelOption1 = document.createElement("option");
			bodyDirectLoginChanelOption1.setAttribute('value', listQueueClient[i].queueId);
			var textOptionSelect1 = document.createTextNode(listQueueClient[i].queueName);
			if (i == 0) {
				bodyDirectLoginChanelOption1.setAttribute('selected', 'selected');
			}
			bodyDirectLoginChanelOption1.appendChild(textOptionSelect1);
			bodyDirectLoginChanel.appendChild(bodyDirectLoginChanelOption1);
		}
	}

	function connectSocket() {
		if (!window.WebSocket) {
			window.WebSocket = window.MozWebSocket;
		}
		if (window.WebSocket) {
			if (!checkConnectFalse) {
				socket = new WebSocket(urlSocket);
				socket.onopen = function(event) {
					console.log("websocket đã được mở");
					if (event.isTrusted === true) {
						if (localStorage.getItem("cusName") != null) {
							getHisstoryChat();
						} else {
							getQueueClientFirst();
						}
					}
				};
				socket.onmessage = function(event) {
					console.log("websocket có sự kiệm mới");
					var data = JSON.parse(event.data);
					console.log(event);
					var eventName = data.eventName;
					if (eventName === "JoinEvent") {
						var msgObj = data.value;
						sessionId = msgObj.sessionId;
						// localStorage.setItem("cusId",msgObj.customerId);
					} else if (eventName === "ChatRequest") {
					} else if (eventName === "SessionCreated") {
						var msgObj = data.value;
						if (msgObj.isSessionCreated) {
							// var fileds = msgObj.image.split("images/");
							// baselinkServer = fileds[0];
							baselinkServer = "http://192.168.20.242:8687/MPCC_CLOUD/";
							localStorage.setItem("baselinkServer", baselinkServer);
							// neu phien chat duoc tao thanh cong thi luu vao localStorage email va name khach hang
							localStorage.setItem("cusId", msgObj.customerId);
							localStorage.setItem("cusemail", msgObj.email);
							localStorage.setItem("sessionId", msgObj.sessionId);
							localStorage.setItem("cusName", msgObj.customerName);
							customerId = msgObj.customerId;
							boxChatTitleAgentInfoNameContainer.innerHTML = msgObj.agentName;
							bodyBoxChatAgentAnswerimg.setAttribute('src', "http://192.168.20.242:8687/MPCC_CLOUD/" + msgObj.image);
							bodyDirectLoginContainer.style.transform = 'translate(120%, 80%)';
							bodyDirectLoginButton.innerText = "Bắt đầu trò chuyện";
							bodyDirectLoginButton.removeAttribute('disabled');
							// cretate chat sucess thì kiểm tra xem còn lịch sử tin nhắn không nếu còn thì fill lại vào cho khách hàng

						}
						localStorage.setItem("agentLogin", "success");
						localStorage.removeItem("firstMessage");

					} else if (eventName === "GetMsgContentWait") {
						// kiem tra xem tin nhan nao cua client chua duoc gui cho agent thi gui cho agent va xoa khoi list tin nhan cho gui
						if (localStorage.getItem("chatcontentunsigned") != null) {
							if (localStorage.getItem("sendChatcontent") != null) {
								localStorage.removeItem("sendChatcontent");
								var contentchat = JSON.parse(localStorage.getItem("chatcontentunsigned"));
								for (var i = 0; i < contentchat.length; i++) {
									sendMsgToClient(contentchat[i].content);
								}
							}

						}
						chatcontentunsigned = [];
					} else if (eventName === "TransferChat") {
						var msgObj = data.value;
						boxChatTitleAgentInfoNameContainer.innerHTML = msgObj.agentName;
						bodyBoxChatAgentAnswerimg.setAttribute('src', "http://192.168.20.242:8687/MPCC_CLOUD/" + ((msgObj.image != null) ? msgObj.image : "images/users/agent.png"));
						var buttonWaiting = bodyDirectLoginButton.innerText;
						if (buttonWaiting.indexOf("Đang kết nối đến hỗ trợ viên") != -1) {
							bodyDirectLoginContainer.style.transform = 'translate(120%, 80%)';
							bodyDirectLoginButton.innerText = "Bắt đầu trò chuyện";
							bodyDirectLoginButton.removeAttribute('disabled');
						}
					} else if (eventName === 'sendMessageOffline') {
						var msgObj=data.value;
						var chatMsg=msgObj.chatMsg;
						if (chatMsg!=null) {
							for (var i = 0; i < chatMsg.length; i++) {
								sayHelloCustomer(chatMsg[i].content, chatMsg[i].url);
								var historyagent = {
										"content" : chatMsg[i].content,
										"type" : "agent",
										"url" : "http://192.168.20.242:8687/MPCC_CLOUD/" + chatMsg[i].url
									};
									chathistory.push(historyagent);
									localStorage.setItem("chathistory", JSON.stringify(chathistory));
							}
						}
						console.log(msgObj);

					} else if (eventName === 'getHiStoryChatClient') {
						var msgObj = data.value;
						boxChatTitleAgentInfoNameContainer.innerHTML = (msgObj.fromName != null) ? msgObj.fromName : "Hỗ Trợ Khách Hàng";
						bodyBoxChatAgentAnswerimg.setAttribute('src', "http://192.168.20.242:8687/MPCC_CLOUD/" + ((msgObj.image != null) ? msgObj.image : "images/users/agent.png"));
						var urlAgent;
						if (localStorage.getItem("chathistory") != null) {
							var historychatclient = JSON.parse(localStorage.getItem("chathistory"));
							var length = historychatclient.length;
							for (var i = 0; i < length; i++) {
								var type = historychatclient[i].type;
								if (type == 'customer') {
									var chatContent = regexLinkText(historychatclient[i].content);
									generClientChatContent(chatContent);
								} else {
									sayHelloCustomer(historychatclient[i].content, historychatclient[i].url);
									urlAgent = historychatclient[i].url;
								}
							}

						}
						bodyBoxChatAgentAnswerimg.setAttribute('src', "http://192.168.20.242:8687/MPCC_CLOUD/" + urlAgent);
						bodyBoxChatAgentAnswerimg.setAttribute('src', urlAgent);
						bodyDirectLoginContainer.style.transform = 'translate(120%, 80%)';
						bodyDirectLoginButton.innerText = "Bắt đầu trò chuyện";
						bodyDirectLoginButton.removeAttribute('disabled');

					} else if (eventName === "Message") {
						// xu ly tin nhan khi agent trả lời
						var msgObj = data.value;
						sayHelloCustomer(msgObj.msg, "http://192.168.20.242:8687/MPCC_CLOUD/" + msgObj.url);
						// lưu lại lịch sử tin nhắn
						var historyagent = {
							"content" : msgObj.msg,
							"type" : "agent",
							"url" : "http://192.168.20.242:8687/MPCC_CLOUD/" + msgObj.url
						};
						chathistory.push(historyagent);
						localStorage.setItem("chathistory", JSON.stringify(chathistory));

					} else if (eventName === "MessageFromClient") {
						var msgObj = data.value;
						var chatContent = regexLinkText(msgObj.msg);
						generClientChatContent(chatContent);

					} else if (eventName == "LoginwithCustomer") {
						generClientChatContent(data.value);
					} else if (eventName === "ListQueueClient") {
						var value = JSON.parse(data.value);
						bodyDirectLoginContainer.setAttribute('style', 'background-image: url("' + value.imageDefault + '"); transform: translate(0%, 0);position: absolute;top: 40px;bottom: 0;height: 380px;width: 100%;color: #333;overflow: hidden;transition: transform .5s ease-in-out;z-index: 10;');
						backgroupImage = value.imageDefault;
						localStorage.setItem("soqueue", value.queue.length);
						// lay duoc listqueue neu nhieu hon 1 queue thi tra ve giao dien neu ma chi co mot queue thi cho gui len server de lay cau chao ve
						if (value.queue.length == 1) {
							localStorage.setItem('queueid', value.queue[0].queueId);
							localStorage.setItem('login', 'false');
							// kiem tra neu co lich su tin nhan thi fill vao
							var urlAgent;
							if (localStorage.getItem("chathistory") != null) {
								var historychatclient = JSON.parse(localStorage.getItem("chathistory"));
								var length = historychatclient.length;
								for (var i = 0; i < length; i++) {
									var type = historychatclient[i].type;
									if (type == 'customer') {
										var chatContent = regexLinkText(historychatclient[i].content);
										generClientChatContent(chatContent);
									} else {
										sayHelloCustomer(historychatclient[i].content, historychatclient[i].url);
										urlAgent = historychatclient[i].url;
									}
								}

							}
							bodyBoxChatAgentAnswerimg.setAttribute('src', 'http://192.168.20.242:8687/MPCC_CLOUD/' + 'images/users/agent.png');
							bodyDirectLoginContainer.style.transform = 'translate(120%, 80%)';
							bodyDirectLoginButton.innerText = "Bắt đầu trò chuyện";
							bodyDirectLoginButton.removeAttribute('disabled');

						} else if (value.queue.length > 1) {
							bindQueuesData(value.queue);
						}

					} else if (eventName === "getListQueueClientFirst") {
						var value = JSON.parse(data.value);
						bodyDirectLoginContainer.setAttribute('style', 'background-image: url("' + value.imageDefault + '"); transform: translate(0%, 0);position: absolute;top: 40px;bottom: 0;height: 380px;width: 100%;color: #333;overflow: hidden;transition: transform .5s ease-in-out;z-index: 10;');
						backgroupImage = value.imageDefault;
						localStorage.setItem("soqueue", value.queue.length);
						// lay duoc listqueue neu nhieu hon 1 queue thi tra ve giao dien neu ma chi co mot queue thi cho gui len server de lay cau chao ve
						if (value.queue.length == 1) {
							localStorage.setItem('queueid', value.queue[0].queueId);
							getContentHello();
						} else if (value.queue.length > 1) {
							bindQueuesData(value.queue);
						}
					} else if (eventName === "MsgHello") {
						localStorage.setItem('login', 'false');
						// kiem tra neu co lich su tin nhan thi fill vao
						var urlAgent;
						if (localStorage.getItem("chathistory") != null) {
							var historychatclient = JSON.parse(localStorage.getItem("chathistory"));
							var length = historychatclient.length;
							for (var i = 0; i < length; i++) {
								var type = historychatclient[i].type;
								if (type == 'customer') {
									var chatContent = regexLinkText(historychatclient[i].content);
									generClientChatContent(chatContent);
								} else {
									sayHelloCustomer(historychatclient[i].content, historychatclient[i].url);
									urlAgent = historychatclient[i].url;
								}
							}

						}

						bodyBoxChatAgentAnswerimg.setAttribute('src', 'http://192.168.20.242:8687/MPCC_CLOUD/' + 'images/users/agent.png');
						bodyDirectLoginContainer.style.transform = 'translate(120%, 80%)';
						bodyDirectLoginButton.innerText = "Bắt đầu trò chuyện";
						bodyDirectLoginButton.removeAttribute('disabled');
						sayHelloCustomer(data.value, 'http://192.168.20.242:8687/MPCC_CLOUD/' + 'images/users/agent.png');
					} else if (eventName === "updateLogin") {
						localStorage.setItem('login', "false");
						// remove sessionId cua no da luu di
						if (localStorage.getItem("sessionId") != null) {
							localStorage.removeItem("sessionId");
						}
						getQueueClient();
					} else if (eventName === "Customer_SendMsg") {
						generClientChatContent(data.value);
					} else if (eventName === "MsgFeedback") {
						var msgObj = JSON.parse(data.value);
						var sessiId = msgObj.sessionId;
					} else if (eventName === "GetMsgWait") {
						generClientChatContent(data.value);
					} else if (eventName === "EndChat") {

						var msgObj = data.value;
						// chathistory = [];
						chatcontentunsigned = [];
						localStorage.setItem("login", "false");
						// localStorage.removeItem("cusId");
						// localStorage.removeItem("cusemail");
						// localStorage.removeItem("chathistory");
						localStorage.removeItem("chatcontentunsigned");
						if (localStorage.getItem("sessionId") != null) {
							localStorage.removeItem("sessionId");
						}
						if (localStorage.getItem("agentLogin") != null) {
							localStorage.removeItem("agentLogin");
						}
						if (msgObj.status != null && msgObj.status == 6) {

							footerClentSpan.setAttribute('style', 'color: rgb(249, 58, 58); border-radius: 5px; padding: 2px; position: relative; font-weight: 700;');
							// kiểm tra xem nếu công ty có nhiều queue thì xử lý như bình thường nếu có 1 queue thì cho nút kết nối tới hỗ trợ viên
							if (localStorage.getItem("soqueue") == 1) {
								// thêm event reconect khi no agent accept
								footerClentSpan.innerText = "Tất cả các giao dịch viên đang bận!";
								footerClentFormContainerButton.innerText = "Kết nối lại";
								bodyBoxChatContainer.style.opacity = "0.09";
							} else if (localStorage.getItem("soqueue") > 1) {
								footerClentSpan.removeAttribute("disabled");
								$(footerClentSpan).show();
								var mp_agent_answer = document.getElementsByClassName('mp-agent-answer' + $version);
								var mp_client_answer = document.getElementsByClassName('mp-client-answer' + $version);

								if (mp_agent_answer.length === 0 && mp_client_answer.length === 0) {
									bodyDirectLoginButton.innerText = "Bắt đầu trò chuyện";
									bodyDirectLoginButton.removeAttribute("disabled");
								}
								mp_client_answer.remove();
								mp_agent_answer.remove();
								bodyDirectLoginContainer.style.transform = 'translate(0%, 0)';
							}
						} else if (msgObj.actionLog.indexOf("agent") != -1 || (msgObj.actionLog.indexOf("SUPERVIOR") != -1 && msgObj.statusChat == 'answer')) {
							// footerClentSpan.setAttribute('style', 'color: rgb(249, 58, 58); border-radius: 5px; padding: 2px; position: relative; font-weight: 700;');
							// footerClentSpan.innerText = "Giao dịch viên đã ngắt kết nối !";
							// footerClentFormContainerButton.innerText = "Phiên chat mới";
							// boxChatTitleEndChatLink.setAttribute('style', 'Margin-left: 4px; color: red;display:none');
							// footerClentFormContainerInput.setAttribute('disabled', true);
						} else if (msgObj.actionLog.indexOf("customer") != -1) {
							footerClentSpan.setAttribute('style', 'color: rgb(249, 58, 58); border-radius: 5px;position: relative; font-weight: 700;');
							footerClentSpan.innerText = "Phiên chat của bạn đã kết thúc !";
							footerClentFormContainerButton.innerText = "Phiên chat mới";
							// boxChatTitleEndChatLink.setAttribute('style', 'Margin-left: 4px; color: red;display:none');
							footerClentFormContainerInput.setAttribute('disabled', true);
						} else {
							// bodyDirectLoginContainerAlert.innerText = "Giao dịch viên đã ngắt kết nối !";
							// $(bodyDirectLoginContainerAlert).delay(4000).hide('slow');

							// footerClentSpan.setAttribute('style', 'color: rgb(249, 58, 58); border-radius: 5px; padding: 2px; position: relative; font-weight: 700;');
							// footerClentSpan.innerText = "Giao dịch viên đã ngắt kết nối !";
							// footerClentFormContainerButton.innerText = "Phiên chat mới";

							// var mp_agent_answer = document.getElementsByClassName('mp-agent-answer' + $version);
							// var mp_client_answer = document.getElementsByClassName('mp-client-answer' + $version);
							// if (mp_agent_answer.length === 0 && mp_client_answer.length === 0) {
							// bodyDirectLoginButton.innerText = "Bắt đầu trò chuyện";
							// bodyDirectLoginButton.removeAttribute("disabled");
							// }
							// mp_client_answer.remove();
							// mp_agent_answer.remove();
							// bodyDirectLoginContainer.style.transform = 'translate(0%, 0)';
						}
					}
				};
				socket.onclose = function(event) {
					console.log("websocket đã bị close");
					checkConnectFalse = true;
				};
				sockets.push(socket);
			}
		} else {
			alert("Your browser does not support Web Socket.");
		}

	}

	window.onbeforeunload = function() {
	};
	function customerEndChat(sesId) {
		var msg = {
			'action' : 'EndChat',
			'sessionId' : sesId,
			'email' : localStorage.getItem("cusemail"),
			'clientType' : 'customer',
			'companyId' : hdCompanyId
		};
		if (socket.readyState === WebSocket.OPEN) {
			socket.send(JSON.stringify(msg));
		}
	}
	function customerEndChatWaiting() {
		var msg = {
			'action' : 'EndChatWaiting',
			'sessionId' : localStorage.getItem('sessionId'),
			'customerId' : localStorage.getItem("cusId"),
			'email' : localStorage.getItem("cusemail"),
			'clientType' : 'customer',
			'companyId' : hdCompanyId
		};
		if (socket.readyState === WebSocket.OPEN) {
			socket.send(JSON.stringify(msg));
		}
	}
	// customer login
	function login(cus, queue) {
		// mặc định thuật toán là 3
		var msg = {
			'action' : 'Login',
			'clientType' : 'customer',
			'queue' : queue,
			'searchAlgorithm' : 3,
			'customerId' : localStorage.getItem("cusId"),
			'msg' : JSON.stringify(cus),
			'keyHistory' : localStorage.getItem("keyHistory")
		};
		send(JSON.stringify(msg));
	}
	function loginWithcusName(cus, queue) {
		// login khi customer da co customerid
		// thuat toan 1 la thuat toan tim tu van vien gan nhat
		var msg = {
			'action' : 'Login',
			'clientType' : 'customer',
			'queue' : queue,
			'searchAlgorithm' : 1,
			'msg' : JSON.stringify(cus),
			'customerId' : localStorage.getItem("cusId")
		};
		send(JSON.stringify(msg));
	}
	function sendMsgWait(msg) {
		var msg = {
			'id' : customerId,
			'sessionId' : localStorage.getItem("sessionId"),
			'customerId' : localStorage.getItem('cusId'),
			'action' : 'sendMsgWait',
			'clientType' : 'customer',
			'msg' : msg,
			'companyId' : hdCompanyId
		};
		send(JSON.stringify(msg));
	}

	function sendMsg(msg) {
		// id: customerId id
		var msgSend = {
			'id' : customerId,
			'sessionId' : localStorage.getItem("sessionId"),
			'action' : 'SendMsg',
			'customerId' : localStorage.getItem('cusId'),
			'clientType' : 'customer',
			'msg' : msg,
			'companyId' : hdCompanyId
		};
		send(JSON.stringify(msgSend));
	}

	function sendMsgToClient(msg) {
		// id: customerId id
		var msgSend = {
			'id' : customerId,
			'sessionId' : sessionId,
			'action' : 'SendMsg',
			'clientType' : 'customer',
			'msg' : msg,
			'customerId' : localStorage.getItem('cusId'),
			'companyId' : hdCompanyId,
			'status' : 1
		};
		send(JSON.stringify(msgSend));
	}

	function getQueueClient() {
		var msgSend = {
			'action' : 'getListQueueClient',
			'companyId' : hdCompanyId
		};
		send(JSON.stringify(msgSend));
	}

	function getQueueClientFirst() {
		var msgSend = {
			'action' : 'getListQueueClientFirst',
			'customerId' : localStorage.getItem("cusId"),
			'companyId' : hdCompanyId
		};
		send(JSON.stringify(msgSend));
	}

	function getHisstoryChat() {
		var msgGetHistory = {
			'action' : 'getHiStoryChatClient',
			'email' : localStorage.getItem("cusemail"),
			'customerId' : localStorage.getItem('cusId'),
			'sessionId' : localStorage.getItem("sessionId")
		};
		send(JSON.stringify(msgGetHistory));
	}

	function loginWithSessionId(sessionId, cusId, cusemail) {
		var msgloginwithssId = {
			'action' : 'Login',
			'email' : cusemail,
			'sessionId' : sessionId,
			'customerId' : cusId
		};
		send(JSON.stringify(msgloginwithssId));
	}

	function getContentHello() {
		var msgSend = {
			'action' : 'getContentHello',
			'companyId' : hdCompanyId
		};
		send(JSON.stringify(msgSend));
	}

	function send(message) {
		if (!window.WebSocket) {
			return;
		}
		if (socket.readyState === WebSocket.OPEN) {
			socket.send(message);
			return true;
		}
		return false;
	}

	function regexLinkText(text) {
	    if(text != undefined){
			var urlRegex = /(https?:\/\/[^\s]+)/g;
			text = text.replace(urlRegex, function(url) {
				return '&nbsp;<a href="' + url + '" style ="color: #0e13e8;" target="_blank">' + url + '</a>&nbsp;';
			});
			var tokens = text.split(".");
			var index = tokens.length - 1;
			var endUrlImage = tokens[index].toLowerCase();
			var indexOf = endUrlImage.indexOf(" (permission denied)");
			var typeFile = endUrlImage;
			if (indexOf != -1)
				typeFile = endUrlImage.substring(0, indexOf);
			if (typeFile == 'png' || typeFile == 'jpg' || typeFile == 'jpeg' || typeFile == 'gif') {
				return '&nbsp;<a target="_blank" href="' + baselinkServer + text + '">' + '<img src="' + baselinkServer + text + '" style="width:50px;height" >' + '</a>' + '&nbsp;';
			}
			;
			if (typeFile == 'xls' || typeFile == 'xml' || typeFile == 'zip' || typeFile == 'rar' || typeFile == 'doc' || typeFile == 'docx' || typeFile == 'ppt' || typeFile == 'pptx' || typeFile == 'pdf' || typeFile == 'xlsb' || typeFile == 'xlsx' || typeFile == 'txt' || typeFile == 'csv') {
				return '&nbsp;<a target="_blank" href="' + baselinkServer + text + '">' + '<img src="' + baselinkServer + 'images/users/file.png' + '" style="width:50px;height:50px;">' + '</a>' + '&nbsp;';
			}
			;
	    }else{
	    	return null;
	    }

		return text;
	}

});