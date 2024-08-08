import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, TextInput,Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';


export default function CreateBill() {
    const [HeadForm, setHeadForm] = useState({ CdNote: "", date: "", InNo: '', Reason: "" });
    const [formData, setFormData] = useState({ SrNo: "", items: "", Qty: '', units: "", price: "", amt: "" });
    const [issueby, setIssueBy] = useState({ IBcompName: "", IBadd: "", IBphnO: "" });
    const [issueTo, setIssueTo] = useState({ ITcompName: "", ITadd: "", ITphno: "" });
    const [rows, setRows] = useState<any[]>([]);
    const [subtotal, setsubtotal] = useState(0);
    const [total, settotal] = useState(0);
    const [sum,setsum] = useState(0);
    

    const handleHeadFormChange = (name: string, value: string) => {
        setHeadForm({ ...HeadForm, [name]: value });
    };

    const handleFormDataChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleIssueByChange = (name: string, value: string) => {
        setIssueBy ({ ...issueby, [name]: value });
    };

    const handleIssueToChange = (name: string, value: string) => {
        setIssueTo ({ ...issueTo, [name]: value });
    };


  const addRow = () => {
    if(Platform.OS==='web'){
    
      const newRow = [
        { text: formData.SrNo, style: "cell" },
        { text: formData.items, style: "cell" },
        { text: formData.Qty, style: "cell" },
        { text: formData.units, style: "cell" },
        { text: formData.price, style: "cell" },
        { text: formData.amt, style: "cell" }
      ];
      setRows([...rows, newRow]);
      setFormData({ SrNo: "", items: "", Qty: "", units: "",price:"",amt:"" });

    }else if(Platform.OS==='android'){
      let samt = 0;
      samt = parseInt(formData.Qty)* parseInt(formData.price);
      
      const newRow = `
      <tr class="row">
        <td class="id" style="border: 1px solid black; border-collapse: collapse; text-align: center; font-size: 16px; color: white; background-color:skyblue; font-weight: 700; padding: 5px; overflow-wrap:break-word; word-wrap:break-word;width:6%;page-break-inside: avoid;break-inside: avoid;">${formData.SrNo}</td>
        <td class="name" style="border: 1px solid black; border-collapse: collapse; text-align: center; font-size: 16px; color: white; background-color:skyblue; font-weight: 700; padding: 5px; overflow-wrap:break-word; word-wrap:break-word;width:40%;page-break-inside: avoid;break-inside: avoid;">${formData.items}</td>
        <td class="product" style="border: 1px solid black; border-collapse: collapse; text-align: center; font-size: 16px; color: white; background-color:skyblue; font-weight: 700; padding: 5px; overflow-wrap:break-word; word-wrap:break-word;width:10%";page-break-inside: avoid;break-inside: avoid;">${formData.Qty}</td>
        <td class="price" style="border: 1px solid black; border-collapse: collapse; text-align: center; font-size: 16px; color: white; background-color:skyblue; font-weight: 700; padding: 5px; overflow-wrap:break-word; word-wrap:break-word;width:10%";page-break-inside: avoid;break-inside: avoid;">${formData.units}</td>
        <td class="price" style="border: 1px solid black; border-collapse: collapse; text-align: center; font-size: 16px; color: white; background-color:skyblue; font-weight: 700; padding: 5px; overflow-wrap:break-word; word-wrap:break-word;width:10%";page-break-inside: avoid;break-inside: avoid;">${formData.price}</td>
        <td class="price" style="border: 1px solid black; border-collapse: collapse; text-align: center; font-size: 16px; color: white; background-color:skyblue; font-weight: 700; padding: 5px; overflow-wrap:break-word; word-wrap:break-word;width:20%";page-break-inside: avoid;break-inside: avoid;">${String(samt)}</td>
      </tr>`;
    
    setRows([...rows, newRow]);
    setsum(prevSum => prevSum + samt);
    setFormData((prevFormData) => ({
      ...prevFormData,
      amt: `${samt}`,
    }));
    setFormData({ SrNo: '', items: '', Qty: '', units: '',price:'',amt:'' });
    


    
      
      
      
    
    }

  };
  


    let html = `<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width initial-scale=1.0">
  <title>replit</title>
  <style>
        @page {
      margin: 20px;
    }
                    .page {
                    margin-bottom: 20px;
                }
                .page-break {
                    page-break-before: always;
                }


  </style>
</head>

<body>


  <div>
    <header
      style="width:100%;height: 30px;background-color: red; justify-content: center; text-align: center;align-content: center; padding-top: 5px; ">
      Credit Note</header>
    <ul style="list-style:none;">

      <li style="margin-top: 50px;font-size: 18px; ;word-wrap: break-word;overflow-wrap: break-word;"><label>Credit Note : </label> ${HeadForm.CdNote} </li>
      <li style="margin-top: 3px;font-size: 18px; ;word-wrap: break-word;overflow-wrap: break-word;"><label>Date : </label> ${HeadForm.date}</li>
      <li style="margin-top: 3px;font-size: 18px; ;word-wrap: break-word;overflow-wrap: break-word;"><label>invoice no : </label> ${HeadForm.InNo}</li>
      <li style="margin-top: 3px;font-size: 18px; ;word-wrap: break-word;overflow-wrap: break-word;"><label>Reason : </label>${HeadForm.Reason}</li>
    </ul>
    
    <div style="display: flex;flex-direction: row; gap: 10px;flex-wrap: wrap;overflow:auto;margin-Left:12px">
      <div style="padding: 20px;width: 43%; border: 1px solid black;padding-bottom: 30px;">
        <ul style="list-style:none;justify-content: center;align-items: center;">
          <li style="margin-top: 30px;font-size: 22px;;word-wrap: break-word;overflow-wrap: break-word;"><label>Company Name : </label> ${issueby.IBcompName}</li>
          <li style="margin-top: 7px;font-size: 22px;;word-wrap: break-word;overflow-wrap: break-word;"><label>Add: </label>${issueby.IBadd}</li>
          <li style="margin-top: 7px;font-size: 22px;;word-wrap: break-word;overflow-wrap: break-word;"><label>Phone No : </label> ${issueby.IBphnO}</li>
        </ul>
      </div>
      <div style="padding: 20px;width: 43%; border: 1px solid black;padding-bottom: 30px; ">
        <ul style="list-style:none; justify-content: center;">
          <li style="margin-top: 30px;font-size: 22px; ;word-wrap: break-word;overflow-wrap: break-word;"><label>Company Name : </label> ${issueTo.ITcompName}</li>
          <li style="margin-top: 7px;font-size: 22px; ;word-wrap: break-word;overflow-wrap: break-word;"><label>Add: </label> ${issueTo.ITadd}</li>
          <li style="margin-top: 7px;font-size: 22px; ;word-wrap: break-word;overflow-wrap: break-word;"><label>Phone No : </label> ${issueTo.ITphno}</li>
        </ul>
      </div>
    </div>
  
      
          <table
      style="width: 100%; border: 1px solid black; border-collapse: collapse;margin-bottom:100px;table-layout: fixed;position: relative;">
      <thead>
        <tr>
          <th
            style="border: 1px solid black; border-collapse: collapse; font-size: 16px; font-weight: 900; background-color:aquamarine; padding: 7px;word-wrap: break-word;overflow-wrap: break-word;width:6%;z-index: 1;display:sticky;top:0;">
            Sr no</th>
          <th
            style="border: 1px solid black; border-collapse: collapse; font-size: 16px; font-weight: 900; background-color:aquamarine; padding: 7px;word-wrap: break-word;overflow-wrap: break-word;width:40%;z-index: 1;display:sticky;top:0;">
            Item</th>
          <th
            style="border: 1px solid black; border-collapse: collapse; font-size: 16px; font-weight: 900; background-color:aquamarine; padding: 7px;word-wrap: break-word;overflow-wrap: break-word;width:10%;z-index: 1;display:sticky;top:0;">
            Qty</th>
          <th
            style="border: 1px solid black; border-collapse: collapse; font-size: 16px; font-weight: 900; background-color:aquamarine; padding: 7px;word-wrap: break-word;overflow-wrap: break-word;width:10%;z-index: 1;display:sticky;top:0;">
            Unit</th>
          <th
            style="border: 1px solid black; border-collapse: collapse; font-size: 16px; font-weight: 900; background-color:aquamarine; padding: 7px;word-wrap: break-word;overflow-wrap: break-word;width:10%;z-index: 1;display:sticky;top:0;">
            Price</th>
          <th
            style="border: 1px solid black; border-collapse: collapse; font-size: 16px; font-weight: 900; background-color:aquamarine; padding: 7px;word-wrap: break-word;overflow-wrap: break-word;width:20%;z-index: 1;display:sticky;top:0;">
            Amount</th>
        </tr>
      </thead>
      <tbody id="table-body">
        ${rows.join('')}


      </tbody>
    </table>
      

      <div>
          
              <ul style="list-style:none; margin-top:50px;margin-left:10px;">
                  <li><label>Sub Total : </label>${sum}</li>
                  <li><label>Taxes : </label></li>
                  <li><label>Total :</label>${sum}</li>
  
              </ul>
      </div>

    </div>

</body>

</html>` ;


const generatePdf=async ()=>{
    const file = await Print.printToFileAsync({
        html: html,
        base64: false
      });
      if (!file.uri) {
        throw new Error('File URI is undefined');
      }
  
      // Share the PDF file
      await shareAsync(file.uri);
}



    return (
        
            <ScrollView style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputtexts}>Credit Note:</Text>
                    <TextInput style={styles.textInputs} value={HeadForm.CdNote} onChangeText={text => handleHeadFormChange('CdNote', text)} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputtexts}>Date:</Text>
                    <TextInput style={styles.textInputs} value={HeadForm.date} onChangeText={text => handleHeadFormChange('date', text)} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputtexts}>Invoice No:</Text>
                    <TextInput style={styles.textInputs} value={HeadForm.InNo} onChangeText={text => handleHeadFormChange('InNo', text)} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputtexts}>Reason:</Text>
                    <TextInput style={styles.textInputs} value={HeadForm.Reason} onChangeText={text => handleHeadFormChange('Reason', text)} />
                </View>

                <View >
                    <View style={styles.issuedBYContainer}>
                        <Text style={{ marginLeft: 30, fontSize: 20, fontStyle: "normal", fontWeight: "700" }}>Issued By</Text>
                        <View style={styles.issuedByInput}>
                            <Text style={styles.inputtexts}>Company name:</Text>
                            <TextInput style={styles.textInputs} value={issueby.IBcompName} onChangeText={text => handleIssueByChange('IBcompName', text)} />
                        </View>
                        <View style={styles.issuedByInput}>
                            <Text style={styles.inputtexts}>Address:</Text>
                            <TextInput style={styles.textInputs} value={issueby.IBadd} onChangeText={text => handleIssueByChange('IBadd', text)} />
                        </View>
                        <View style={styles.issuedByInput}>
                            <Text style={styles.inputtexts}>Phone No:</Text>
                            <TextInput style={styles.textInputs} value={issueby.IBphnO} onChangeText={text => handleIssueByChange('IBphnO', text)} />
                        </View>
                    </View>

                    <View style={styles.issuedBYContainer}>
                        <Text style={{ marginLeft: 30, fontSize: 20, fontStyle: "normal", fontWeight: "700" }}>Issued To</Text>
                        <View style={styles.issuedByInput}>
                            <Text style={styles.inputtexts}>Company name:</Text>
                            <TextInput style={styles.textInputs} value={issueTo.ITcompName} onChangeText={text => handleIssueToChange('ITcompName', text)} />
                        </View>
                        <View style={styles.issuedByInput}>
                            <Text style={styles.inputtexts}>Address:</Text>
                            <TextInput style={styles.textInputs} value={issueTo.ITadd} onChangeText={text => handleIssueToChange('ITadd', text)} />
                        </View>
                        <View style={styles.issuedByInput}>
                            <Text style={styles.inputtexts}>Phone No:</Text>
                            <TextInput style={styles.textInputs} value={issueTo.ITphno} onChangeText={text => handleIssueToChange('ITphno', text)} />
                        </View>
                    </View>
                </View>

                    
                    <View  style={{position:'relative',left:100,marginTop:20}} >
                    <View style={styles.VITable}>
                        <TextInput placeholder="Sr no" style={styles.inputTable} value={formData.SrNo} onChangeText={text => handleFormDataChange('SrNo', text)} />
                    </View>

                    <View style={styles.VITable}>
                        <TextInput placeholder="Item" style={styles.inputTable} value={formData.items} onChangeText={text => handleFormDataChange('items', text)} />
                    </View>

                    <View style={styles.VITable}>
                        <TextInput placeholder="Quantity" style={styles.inputTable} value={formData.Qty} onChangeText={text => handleFormDataChange('Qty', text)} defaultValue="0" />
                    </View>
                    
                    <View style={styles.pickerContainer}>
                        
                        <Picker
                            selectedValue={formData.units}
                            style={styles.stylePicker}
                            onValueChange={(item) => handleFormDataChange('units', item)}>
                            <Picker.Item label="none" value={null}/>
                            <Picker.Item label="Cm" value='cm' />
                            <Picker.Item label="Metre" value='metre' />
                            <Picker.Item label="Liter" value='liter' />
                            <Picker.Item label="Milliliter" value='milliliter' />
                            <Picker.Item label="Pics" value='Pics' />
                        </Picker>
                    </View>
                    <View style={styles.VITable}>
                        <TextInput placeholder="Price" style={styles.inputTable} value={formData.price} onChangeText={text => handleFormDataChange('price', text)} defaultValue="0" />
                    </View>

                    </View>
                
                    
                    <View style={{position:'relative',left:150}}>
                    <View style={styles.VITable}>
                        <TouchableOpacity style={{marginTop: 10, height: 30, borderColor: '#000', borderWidth: 1, borderRadius: 4, width: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: "aqua" }}onPress={addRow}>
                            <Text>Add</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btncon}>
                        <TouchableOpacity style={{ marginTop: 10, height: 30, borderColor: '#000', borderWidth: 1, borderRadius: 4, width: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: "red" }} onPress={generatePdf}>
                            <Text>GeneratePdf</Text>
                        </TouchableOpacity>
                    </View>
                    </View>

                           
                           </ScrollView>
            
           
        
    );
}

if (Platform.OS==='android') {
  
}
const styles =StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffff'

    },
    inputContainer:{
        marginTop:15,
        marginLeft:15,
        marginRight:15
    },
    textInputs:{
        marginTop:4,
        height:40,
        borderColor:"#000",
        borderWidth:1,
        borderRadius:4,
        padding:4,
        marginBottom:6,
        position:'absolute',
        width:200,
        left:100,
        maxHeight:30  
    },
    inputtexts:{
        marginTop:10,
        fontStyle:"normal",
        fontWeight:"600"

    },
    issuedBYContainer:{
        marginTop:100,
        marginLeft:20,
        borderColor:"#000",
        width:'90%',
        borderWidth:1,
        padding:20,
        paddingBottom:30,
        height:'auto',
        borderRadius:20

    },
    issuedByInput:{
        marginTop:15,
        marginLeft:15,
        marginRight:15
    },
    inputTable:{
        marginTop:10,
        height:40,
        borderColor:"#000",
        borderWidth:1,
        borderRadius:4,
        padding:4,
        marginBottom:6,
        width:200,
        
        maxHeight:30  
    },
    VITable:{
        marginTop:10,
        marginLeft:5,
        marginRight:15
    },
    stylePicker:{
        width:200,
        height:30,
        padding:4,

    },
    pickerContainer:{
        
        marginLeft:5,
        marginRight:15,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 4,
        justifyContent:'center',
        alignItems:'center',
        height:'auto',
        width:200,
        marginBottom:0
        
        
    },
    btncon:{
      marginTop:10,
      marginLeft:5,
      marginRight:15
    }

})
