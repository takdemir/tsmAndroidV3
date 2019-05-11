function RegisterCourier() {

    this.url = 'https://kuryeotomasyon.com/api';

    this.register = function () {

        var companyInput = $('#popuptsmcompanies');
        var nameInput = $('#popupname');
        var phoneInput = $('#popupmobilePhone');
        var emailInput = $('#popupemail');
        var addressInput = $('#popupaddress');
        var districtInput = $('#popuptsmdistrict');
        var tcInput = $('#popuptc');
        var bloodInput = $('#popupbloodGroup');
        //var usernameInput = $('#popupwebUsername');
        //var passwordInput = $('#popupwebPassword');

        if(common.isFalsy(nameInput.val())){
            alert('adınızı');
            common.showToast('Lütfen adınızı giriniz!','long','center',0);
        }else if(common.isFalsy(phoneInput.val())){
            common.showToast('Lütfen cep telefonu giriniz!','long','center',0);
        }else if(common.isFalsy(emailInput.val()) || emailInput.val().indexOf('@')===-1){
            common.showToast('Lütfen email giriniz!','long','center',0);
        }else if(common.isFalsy(addressInput.val())){
            common.showToast('Lütfen adres giriniz!','long','center',0);
        }else if(common.isFalsy(districtInput.val())){
            common.showToast('Lütfen semt seçiniz!','long','center',0);
        }else if(common.isFalsy(tcInput.val()) || tcInput.val().length!==11 || /^\d{11}$/.test(tcInput.val())===false){
            common.showToast('Lütfen TC kimlik numaranızı giriniz!','long','center',0);
        }else if(common.isFalsy(bloodInput.val())){
            common.showToast('Lütfen kan grubunuzu giriniz!','long','center',0);
        }/*else if(common.isFalsy(usernameInput.val())){
            common.showToast('Lütfen kullanıcıadı giriniz!','long','center',0);
        }else if(common.isFalsy(passwordInput.val())){
            common.showToast('Lütfen içinde en az bir büyük harf, bir küçük harf, bir sayı ve bir karakter içeren şifre giriniz!','long','center',0);
        }*/else{

            var data = {'name':nameInput.val(),
                        'courierNumber':9999,
                        'address':addressInput.val(),
                        'tsmdistrict':districtInput.val(),
                        'mobilePhone':phoneInput.val(),
                        'phone':phoneInput.val(),
                        'tc':tcInput.val(),
                        'email':emailInput.val(),
                        'bloodGroup':bloodInput.val(),
                        'tsmmotorbikes':0,
                        'earnRate':0,
                        /*'webUsername':usernameInput.val(),
                        'webPassword':passwordInput.val(),*/
                        'isActive':0};

            if(!common.isFalsy(companyInput.val())) {
                common.setAjaxRequest(companyInput.val() + "/registercourierfromandroid", data, function (result, data) {

                    if (result === 'success') {
                        let host = companyInput.val().replace('/api','');

                        socket.emit('new-courier-registered-from-app', {
                            'message': nameInput.val() + ' isimli kurye sisteme üyelik başvurusu yaptı! Cep telefonu: ' + phoneInput.val(),
                            'process': 'new-courier-registered-from-app',
                            'username':'',
                            'host': host
                        });

                        alert('Başvurunuz alındı. Olumlu olması halinde size dönüş yapılacaktır!');
                        window.location.href="login.html";

                    } else {
                        alert(data.msg);
                    }

                }, 'POST');
            }
        }

    };

    this.getDistrict = function () {
        let popuptsmdistrictSelect = $('#popuptsmdistrict');
        popuptsmdistrictSelect.append('<option value="">Semt Seçiniz...</option>');
        var companyInput = $('#popuptsmcompanies');

        common.setAjaxRequest(companyInput.val()+"/districts",{},function (result,data) {

            if(result==='success'){
                $.each(data.data, function (k,v) {
                    popuptsmdistrictSelect.append('<option value="'+v.id+'">'+v.districtName+'</option>');
                });

            }else{
                alert(data.msg);
            }

        },'GET');

    };

    this.getCompanies = function () {
        let popuptsmcompaniesSelect = $('#popuptsmcompanies');
        popuptsmcompaniesSelect.append('<option value="">Şirket Seçiniz...</option>');

        common.setAjaxRequest(this.url+"/getcompanys",{},function (result,data) {

            if(result==='success'){
                $.each(data.data, function (k,v) {
                    popuptsmcompaniesSelect.append('<option value="'+v.sirketip+'">'+v.name+'</option>');
                });

            }else{
                alert(data.msg);
            }

        },'GET');

    }
}

var registerCourier = new RegisterCourier();
registerCourier.getCompanies();
