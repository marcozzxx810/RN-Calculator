import React, { Component } from "react";
import { 
    View,
    Text,
    Button,
    TouchableOpacity,
    StyleSheet
} from "react-native";

class CalculatorScreen extends Component {

    constructor(){
        super()
        this.state = {
            resultText:"",
            calculationText:""
        }
        this.operations=['D','+','-','*','/']
    }
    calculateResult(){
        const text = this.state.resultText
        //now parse this text

        try {
            this.setState({
                //calculationText: eval(text)
                calculationText: eval(text)
            
        })
        } catch (e) {
            if (e instanceof SyntaxError) {
                this.setState({
                    //calculationText: eval(text)
                    calculationText: "SyntaxError"
                
                })
            } else {
                throw( e );
            }
        }

        
        this.setState({
                //calculationText: eval(text)
                
            
        })

    }

    buttonPressed(text){
        console.log(text)
        if ( text == '='){
           return this.calculateResult()
        } 
        this.setState({
            resultText: this.state.resultText+text
        })
        
    }

    operate(operation){
        switch(operation){
            case 'D':
                console.log(this.state.resultText)
                const text = this.state.resultText.split('')
                text.pop()
                this.setState({
                    resultText: text.join('')
                })
                break
            case '+':
            case '-':
            case '*':
            case '/':
                const lastchar = this.state.resultText.split('').pop()

                if(this.operations.indexOf(lastchar) > 0){
                    return
                }
                if(this.state.text == "") {
                    return
                }
                this.setState({
                    resultText: this.state.resultText + operation
                })
        }

    }

    render() {

        let  rows =[]
        let nums= [[1,2,3], [4,5,6], [7,8,9], ['.',0,'=']]
        for(let i = 0; i <4 ; i++){
            let row = []
            for(let j=0; j<3 ; j++){
            row.push(<TouchableOpacity style={styles.btn} onPress={()=>this.buttonPressed(nums[i][j])}><Text style={styles.btnText}>{nums[i][j]}</Text></TouchableOpacity>)
            }
            rows.push(<View style={styles.row}>{row}</View>)
        }

        let ops =[]
        for(let i = 0; i <5 ; i++){
            ops.push(<TouchableOpacity style={styles.btn} onPress={()=>this.operate(this.operations[i])}><Text style={styles.btnText, styles.white}>{this.operations[i]}</Text></TouchableOpacity>)
        }

        return (
            <View style={styles.container}>
                <View style={styles.result}>
                    <Text style={styles.resultText}>{this.state.resultText}</Text>
                </View>
                <View style={styles.calculation}>
                <Text style={styles.calculationText}>{this.state.calculationText}</Text>
                </View>
                <View style={styles.buttons}>
                    <View style={styles.numbers}>
                          {rows}  
                    </View>
                    <View style={styles.operations}>
                        {ops}
                    </View>
                </View>
            </View>
        );
    }
}
export default CalculatorScreen;

const styles = StyleSheet.create({
    container : {
        flex :1
    },
    resultText:{
        fontSize:40,
        color:'white'
    },
    calculationText:{
        fontSize:30,
        color:'white'
    },
    btnText:{
        fontSize:50,
    },
    white:{
        fontSize:50,
        color:'white'
    },
    row:{
        flex :1,
        flexDirection:'row',
        justifyContent:"space-around",
        alignItems:'center'
    },
    btn:{
        flex:1,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    result:{
        flex:2,
        backgroundColor: 'red',
        justifyContent:'center',
        alignItems:'flex-end'
    },
    calculation:{
        flex :1,
        backgroundColor: 'green',
        justifyContent:'center',
        alignItems:'flex-end'
    },
    buttons:{
        flex:5,
        flexDirection: 'row',
    },
    numbers:{
        flex:3,
        backgroundColor : 'yellow',
    },
    operations :{
        flex:1,
        backgroundColor: 'black',
        justifyContent:"space-around",
    }

});