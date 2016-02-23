import './scss/app.scss';

import React, { Component } from 'react';

const rewardData = [
	{"id": 1, "prize": "590大洋", "v": 1.0},
	{"id": 2, "prize": "100RMB", "v": 2.0},
	{"id": 3, "prize": "安慰奖", "v": 48.0}
];// 奖项json

const noRewardData = [ 
	{"angle": "1470", "t": "谢谢参与！"},
	{"angle": "1497", "t": "下次再来！"},
	{"angle": "1526", "t": "要加油哦！"},
	{"angle": "1585", "t": "运气先攥着！"},
	{"angle": "1618", "t": "下次再来！"},
	{"angle": "1650", "t": "再接再厉！"},
	{"angle": "1712", "t": "祝您好运！"},
	{"angle": "1742", "t": "下次再来！"},
	{"angle": "1772", "t": "不要灰心！"}
];// 奖项json

const randomNum = function (smin, smax) {// 获取2个值之间的随机数
	var Range = smax - smin;
	var Rand = Math.random();
	return (smin + Math.round(Rand * Range));
};

class Lottery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			angle: '',
			active: false,
			finished: false,
			returnText: ""
		};
	}
	componentDidUpdate() {
		this.state = {
			active: false,
			finished: true
		};
		//var myreturn = this.state.returnText;
		//alert("myreturn");
	}
	renderLottery() {
		return (
			<div className="lottery-pan">
			    <div className="rotate-con-pan">
					<div className={active ? "rotate-con-zhen rotate-con-zhen-rotate rotate"+angle : "rotate-con-zhen"} duration="5000" onClick={
						(event) => {
						this.runLottery();
					}}>
					</div>
				</div>
				<div className="lottery-result"><button className={finished ? "" : "lottery-hide"} onClick={
						(event) => {
						this.reSetLottery();
					}}>重新开始</button></div>
			</div>
		);
	}
	render() {
		var { angle, active, finished, returnText } = this.state;
		return (
			<div className="lottery-pan">
			    <div className="rotate-con-pan">
					<div className={active ? "rotate-con-zhen rotate-con-zhen-rotate rotate"+angle : "rotate-con-zhen"} duration="5000" onClick={
						(event) => {
						this.runLottery();
					}}>
					</div>
				</div>
			</div>
		);
	}

	runLottery() {
		var { finished } = this.state;
		if (!finished) {
			var result = randomNum(1, 100);
			var line = 0;
			var temp = 0;
			var returnText = "";
			var index = 0;
			//alert("随机数"+result);
			for ( var i = 0; i < rewardData.length; i++) {
				var data = rewardData[i];
				var c = parseFloat(data.v);
				temp = temp + c;
				line = 100 - temp;
				
				if (result > line && result <= (line + c)) {
					index = i;
					returnText = data;
					break;
				}
			}

			var angle = "1440";
			var message = "";
			var myreturn = "";
			if (returnText != "") {// 有奖
				message = "恭喜中奖了";
				switch (index) {
				case 0:// 一等奖
					angle = "1800";
					break;
				case 1:// 二等奖
					angle = "1682";
					break;
				case 2:// 三等奖
					angle = "1556";
					break;
				}
				myreturn = message + returnText.prize;
			} else {// 没有
				message = "很遗憾。";
				var r = randomNum(0, 8);
				angle = noRewardData[r].angle;
				message = noRewardData[r].t;
				myreturn = message;

			}
			//var { onAdd } = this.props;
			this.setState({
				angle: angle,
				active: true,
				finished: true,
				returnText: myreturn
			});
			var _this = this;
			setTimeout(function(){
				alert(myreturn);
			},4000);
			//this.showText(myreturn);
		} else {
			return false;
		}
		
	}

	reSetLottery() {
		this.setState({
			angle: "",
			active: false,
			finished: false,
			returnText: ""
		});
		//var { active } = this.state;
		//alert(active);
	}
};

Lottery.propTypes = {
	duration: React.PropTypes.number,
	angle: React.PropTypes.number
};


export default Lottery;