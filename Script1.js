// ══════════════════════════════════════════
// CONFIG — update this to your backend URL
// ══════════════════════════════════════════
var BACKEND_URL = "http://localhost:5000"; // e.g. https://yourserver.com

// ══════════════════════════════════════════
// AGE AUTO CALCULATOR
// ══════════════════════════════════════════
function calculateAge() {
    var dobVal = document.getElementById("dob").value;
    if (!dobVal) { document.getElementById("age").value = ""; return; }
    var dob   = new Date(dobVal);
    var today = new Date();
    var age   = today.getFullYear() - dob.getFullYear();
    var m     = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
    document.getElementById("age").value = age > 0 ? age : "";
}

// ══════════════════════════════════════════
// ADDRESS SYNC — copies permanent to correspondence
// Also supports vice-versa: if correspondence is typed while checkbox is ON, it unfocuses checkbox
// ══════════════════════════════════════════
function syncAddress() {
    var check = document.getElementById("copyCheck");
    var fields = ["house","area","district","city","state","pin"];
    if (check.checked) {
        fields.forEach(function(f){
            var corr = document.getElementById("c"+f);
            var perm = document.getElementById("p"+f);
            if (corr && perm) corr.value = perm.value;
            if (corr) corr.readOnly = true;
        });
    } else {
        fields.forEach(function(f){
            var corr = document.getElementById("c"+f);
            if (corr) { corr.value = ""; corr.readOnly = false; }
        });
    }
}

// Live sync: when permanent address is typed and checkbox is checked
function liveSync() {
    if (document.getElementById("copyCheck").checked) syncAddress();
}

// ══════════════════════════════════════════
// 10th PERCENTAGE CALCULATOR
// ══════════════════════════════════════════
function calc10() {
    var max = parseFloat(document.getElementById("maxMarks10").value);
    var obt = parseFloat(document.getElementById("obtMarks10").value);
    if (!isNaN(max) && !isNaN(obt) && max > 0) {
        document.getElementById("per10").value = ((obt / max) * 100).toFixed(2);
    } else {
        document.getElementById("per10").value = "";
    }
}

// ══════════════════════════════════════════
// 12th PCB PERCENTAGE CALCULATOR
// ══════════════════════════════════════════
function calculatePCB() {
    var phy = parseFloat(document.getElementById("physics").value)   || 0;
    var che = parseFloat(document.getElementById("chemistry").value) || 0;
    var bio = parseFloat(document.getElementById("biology").value)   || 0;
    var pct = ((phy + che + bio) / 300) * 100;
    document.getElementById("percentage").value = pct.toFixed(2);
    var warn = document.getElementById("pcbWarning");
    if (warn) warn.style.display = pct < 45 ? "block" : "none";
}

// English marks live warning
function checkEnglish() {
    var eng  = parseFloat(document.getElementById("english").value) || 0;
    var warn = document.getElementById("engWarning");
    if (warn) warn.style.display = eng < 45 ? "block" : "none";
}

// ══════════════════════════════════════════
// DOCUMENT UPLOAD VALIDATORS (100 KB limit)
// ══════════════════════════════════════════
function fileCheck(inputId, maxKB) {
    document.getElementById(inputId).addEventListener("change", function(){
        var file = this.files[0];
        if (!file) return;
        if (file.size / 1024 > maxKB) {
            alert("❌ File too large!\n'" + file.name + "' is " + (file.size/1024).toFixed(1) + " KB.\nMaximum allowed: " + maxKB + " KB.");
            this.value = "";
        }
    });
}

// Photo: preview + 100KB
document.getElementById("photoUpload").addEventListener("change", function(){
    var file = this.files[0];
    if (!file) return;
    if (file.size / 1024 > 100) {
        alert("❌ Photo must be less than 100 KB. Your file: " + (file.size/1024).toFixed(1) + " KB");
        this.value = ""; return;
    }
    var reader = new FileReader();
    reader.onload = function(e){
        var img = document.getElementById("photoPreview");
        img.src = e.target.result;
        img.style.display = "block";
    };
    reader.readAsDataURL(file);
});

// Signature: preview + 100KB
document.getElementById("signatureUpload").addEventListener("change", function(){
    var file = this.files[0];
    if (!file) return;
    if (file.size / 1024 > 100) {
        alert("❌ Signature must be less than 100 KB. Your file: " + (file.size/1024).toFixed(1) + " KB");
        this.value = ""; return;
    }
    var reader = new FileReader();
    reader.onload = function(e){
        var img = document.getElementById("signPreview");
        img.src = e.target.result;
        img.style.display = "block";
    };
    reader.readAsDataURL(file);
});

// Other documents 100KB
["marksheet10","marksheet12","aadharUpload"].forEach(function(id){
    document.getElementById(id).addEventListener("change", function(){
        if (this.files[0] && this.files[0].size / 1024 > 100) {
            alert("❌ File must be less than 100 KB. Your file: " + (this.files[0].size/1024).toFixed(1) + " KB");
            this.value = "";
        }
    });
});

// ══════════════════════════════════════════
// PCB + ENGLISH ELIGIBILITY VALIDATION
// ══════════════════════════════════════════
function validateEligibility() {
    var phy    = parseFloat(document.getElementById("physics").value)   || 0;
    var che    = parseFloat(document.getElementById("chemistry").value) || 0;
    var bio    = parseFloat(document.getElementById("biology").value)   || 0;
    var eng    = parseFloat(document.getElementById("english").value)   || 0;
    var pcbPct = ((phy + che + bio) / 300) * 100;

    if (pcbPct < 45) {
        alert("❌ Not Eligible!\n\nYour PCB percentage is " + pcbPct.toFixed(2) + "%\nMinimum 45% required in Physics, Chemistry & Biology combined.\n\nYou cannot proceed with this application.");
        return false;
    }
    if (eng < 45) {
        alert("❌ Not Eligible!\n\nYour English marks are " + eng + " out of 100\nMinimum 45 marks required in English.\n\nYou cannot proceed with this application.");
        return false;
    }
    return true;
}

// ══════════════════════════════════════════
// FORM SUBMIT HANDLER
// ══════════════════════════════════════════
function handleSubmit(event) {
    event.preventDefault();

    // Required fields check
    var errors = [];
    var f = document.getElementById("nursingForm");
    function req(name, label) {
        var el = f.querySelector("[name='" + name + "']");
        if (!el || !el.value.trim()) errors.push(label);
    }

    req("fullName","Full Name"); req("fatherName","Father's Name"); req("motherName","Mother's Name");
    req("gender","Gender"); req("dob","Date of Birth"); req("mobile","Mobile Number");
    req("email","Email Address"); req("aadhar","Aadhar Number"); req("category","Category");
    req("exam10","10th Examination"); req("board10","10th Board"); req("school10","10th School");
    req("year10","10th Year"); req("exam12","12th Examination"); req("board12","12th Board");
    req("college12","12th College"); req("year12","12th Year"); req("subject12","Subject");

    ["phouse","parea","pdistrict","pcity","pstate","ppin"].forEach(function(id){
        if (!document.getElementById(id).value.trim()) errors.push("Permanent " + id.slice(1));
    });
    ["chouse","carea","cdistrict","ccity","cstate","cpin"].forEach(function(id){
        if (!document.getElementById(id).value.trim()) errors.push("Correspondence " + id.slice(1));
    });
    if (!document.getElementById("physics").value)   errors.push("Physics Marks");
    if (!document.getElementById("chemistry").value) errors.push("Chemistry Marks");
    if (!document.getElementById("biology").value)   errors.push("Biology Marks");
    if (!document.getElementById("english").value)   errors.push("English Marks");

    if (!document.getElementById("marksheet10").files[0])   errors.push("10th Marksheet");
    if (!document.getElementById("marksheet12").files[0])   errors.push("12th Marksheet");
    if (!document.getElementById("aadharUpload").files[0])  errors.push("Aadhar Card");
    if (!document.getElementById("photoUpload").files[0])   errors.push("Photo");
    if (!document.getElementById("signatureUpload").files[0]) errors.push("Signature");

    if (errors.length > 0) {
        alert("⚠️ Please fill all mandatory fields:\n\n" + errors.join("\n"));
        return false;
    }

    if (!validateEligibility()) return false;

    // Generate application ID
    var appId   = "BSC" + Date.now().toString().slice(-6);
    var appDate = new Date().toISOString().split("T")[0];
    f.querySelector("[name='applicationId']").value   = appId;
    f.querySelector("[name='applicationDate']").value = appDate;

    openPaymentPopup();
    return false;
}

// ══════════════════════════════════════════
// PAYMENT POPUP
// ══════════════════════════════════════════
function openPaymentPopup() {
    document.getElementById("popupAppId").textContent = document.querySelector("[name='applicationId']").value;
    document.getElementById("popupName").textContent  = document.querySelector("[name='fullName']").value;
    document.getElementById("paymentPopup").style.display = "flex";
}

function closePaymentPopup() {
    document.getElementById("paymentPopup").style.display = "none";
}

// ══════════════════════════════════════════
// RAZORPAY PAYMENT
// ══════════════════════════════════════════
function startPayment() {
    var options = {
        key:         "rzp_live_871H2Jybngmseo",
        amount:      100000, // in paise = ₹1000
        currency:    "INR",
        name:        "Vivek University",
        description: "B.Sc Nursing Application Fee",
        prefill: {
            name:    document.querySelector("[name='fullName']").value,
            email:   document.querySelector("[name='email']").value,
            contact: document.querySelector("[name='mobile']").value
        },
        theme: { color: "#2c3e7a" },
        handler: function(response) {
            closePaymentPopup();
            var payId = response.razorpay_payment_id;
            document.querySelector("[name='transactionId']").value   = payId;
            document.querySelector("[name='transactionDate']").value = new Date().toISOString().split("T")[0];
            saveApplicationToBackend(payId);
        },
        modal: {
            ondismiss: function() { alert("Payment cancelled. Please try again."); }
        }
    };
    new Razorpay(options).open();
}

// ══════════════════════════════════════════
// SAVE TO BACKEND (MongoDB via Express API)
// ══════════════════════════════════════════
function saveApplicationToBackend(payId) {
    var f = document.getElementById("nursingForm");
    function g(name) { var el = f.querySelector("[name='" + name + "']"); return el ? el.value : ""; }

    // Collect files as base64
    var filePromises = [];
    var fileFields   = ["photoUpload","signatureUpload","marksheet10","marksheet12","aadharUpload"];
    var fileNames    = ["photo","signature","marksheet10","marksheet12","aadharCard"];

    fileFields.forEach(function(id, idx){
        var file = document.getElementById(id).files[0];
        if (file) {
            filePromises.push(new Promise(function(resolve){
                var reader = new FileReader();
                reader.onload = function(e){ resolve({ key: fileNames[idx], data: e.target.result }); };
                reader.readAsDataURL(file);
            }));
        } else {
            filePromises.push(Promise.resolve({ key: fileNames[idx], data: "" }));
        }
    });

    Promise.all(filePromises).then(function(files){
        var filesObj = {};
        files.forEach(function(f){ filesObj[f.key] = f.data; });

        var payload = {
            applicationId:   g("applicationId"),
            applicationDate: g("applicationDate"),
            transactionId:   payId,
            transactionDate: new Date().toISOString().split("T")[0],
            fullName:        g("fullName"),
            fatherName:      g("fatherName"),
            motherName:      g("motherName"),
            gender:          g("gender"),
            dob:             g("dob"),
            age:             document.getElementById("age").value,
            mobile:          g("mobile"),
            email:           g("email"),
            aadhar:          g("aadhar"),
            category:        g("category"),
            phouse:          document.getElementById("phouse").value,
            parea:           document.getElementById("parea").value,
            pdistrict:       document.getElementById("pdistrict").value,
            pcity:           document.getElementById("pcity").value,
            pstate:          document.getElementById("pstate").value,
            ppin:            document.getElementById("ppin").value,
            chouse:          document.getElementById("chouse").value,
            carea:           document.getElementById("carea").value,
            cdistrict:       document.getElementById("cdistrict").value,
            ccity:           document.getElementById("ccity").value,
            cstate:          document.getElementById("cstate").value,
            cpin:            document.getElementById("cpin").value,
            exam10:          g("exam10"),
            board10:         g("board10"),
            school10:        g("school10"),
            year10:          g("year10"),
            maxMarks10:      document.getElementById("maxMarks10").value,
            obtMarks10:      document.getElementById("obtMarks10").value,
            percent10:       document.getElementById("per10").value,
            exam12:          g("exam12"),
            board12:         g("board12"),
            college12:       g("college12"),
            year12:          g("year12"),
            physics:         document.getElementById("physics").value,
            chemistry:       document.getElementById("chemistry").value,
            biology:         document.getElementById("biology").value,
            english:         document.getElementById("english").value,
            pcbPercent:      document.getElementById("percentage").value,
            subject12:       g("subject12"),
            files:           filesObj
        };

        fetch(BACKEND_URL + "/api/apply", {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify(payload)
        })
        .then(function(res){ return res.json(); })
        .then(function(data){
            console.log("✅ Saved to backend:", data);
            populatePDFTemplate(payId);
            // Open admit card page after success
            alert("✅ Payment Successful & Application Saved!\nPayment ID: " + payId + "\nApplication No: " + payload.applicationId + "\n\nYou will now be redirected to download your Admit Card.");
            window.open("admit_card.html?appId=" + payload.applicationId + "&mobile=" + payload.mobile, "_blank");
        })
        .catch(function(err){
            console.error("❌ Backend error:", err);
            // Still show PDF even if backend fails
            populatePDFTemplate(payId);
            alert("✅ Payment Successful!\nPayment ID: " + payId + "\n\n⚠ Note: Could not save to server. Please screenshot your payment ID.");
        });
    });
}

// ══════════════════════════════════════════
// POPULATE PDF TEMPLATE
// ══════════════════════════════════════════
function populatePDFTemplate(paymentId) {
    var f = document.getElementById("nursingForm");
    function g(name) { var el = f.querySelector("[name='" + name + "']"); return el ? el.value : ""; }

    document.getElementById("pdf_appId").textContent     = g("applicationId");
    document.getElementById("pdf_appDate").textContent   = g("applicationDate");
    document.getElementById("pdf_payId").textContent     = paymentId;
    document.getElementById("pdf_fullName").textContent  = g("fullName");
    document.getElementById("pdf_fatherName").textContent= g("fatherName");
    document.getElementById("pdf_motherName").textContent= g("motherName");
    document.getElementById("pdf_gender").textContent    = g("gender");
    document.getElementById("pdf_dob").textContent       = g("dob");
    document.getElementById("pdf_age").textContent       = document.getElementById("age").value;
    document.getElementById("pdf_mobile").textContent    = g("mobile");
    document.getElementById("pdf_email").textContent     = g("email");
    document.getElementById("pdf_aadhar").textContent    = g("aadhar");
    document.getElementById("pdf_category").textContent  = g("category");
    document.getElementById("pdf_phouse").textContent    = document.getElementById("phouse").value;
    document.getElementById("pdf_parea").textContent     = document.getElementById("parea").value;
    document.getElementById("pdf_pdistrict").textContent = document.getElementById("pdistrict").value;
    document.getElementById("pdf_pcity").textContent     = document.getElementById("pcity").value;
    document.getElementById("pdf_pstate").textContent    = document.getElementById("pstate").value;
    document.getElementById("pdf_ppin").textContent      = document.getElementById("ppin").value;
    document.getElementById("pdf_chouse").textContent    = document.getElementById("chouse").value;
    document.getElementById("pdf_carea").textContent     = document.getElementById("carea").value;
    document.getElementById("pdf_cdistrict").textContent = document.getElementById("cdistrict").value;
    document.getElementById("pdf_ccity").textContent     = document.getElementById("ccity").value;
    document.getElementById("pdf_cstate").textContent    = document.getElementById("cstate").value;
    document.getElementById("pdf_cpin").textContent      = document.getElementById("cpin").value;
    document.getElementById("pdf_exam10").textContent    = g("exam10");
    document.getElementById("pdf_board10").textContent   = g("board10");
    document.getElementById("pdf_school10").textContent  = g("school10");
    document.getElementById("pdf_year10").textContent    = g("year10");
    document.getElementById("pdf_maxMarks10").textContent= document.getElementById("maxMarks10").value;
    document.getElementById("pdf_obtMarks10").textContent= document.getElementById("obtMarks10").value;
    document.getElementById("pdf_percent10").textContent = document.getElementById("per10").value + "%";
    document.getElementById("pdf_exam12").textContent    = g("exam12");
    document.getElementById("pdf_board12").textContent   = g("board12");
    document.getElementById("pdf_college12").textContent = g("college12");
    document.getElementById("pdf_year12").textContent    = g("year12");
    document.getElementById("pdf_physics").textContent   = document.getElementById("physics").value;
    document.getElementById("pdf_chemistry").textContent = document.getElementById("chemistry").value;
    document.getElementById("pdf_biology").textContent   = document.getElementById("biology").value;
    document.getElementById("pdf_english").textContent   = document.getElementById("english").value;
    document.getElementById("pdf_pcbPercent").textContent= document.getElementById("percentage").value + "%";
    document.getElementById("pdf_subject").textContent   = g("subject12");

    var photoImg = document.getElementById("photoPreview");
    if (photoImg && photoImg.src && photoImg.src.startsWith("data:"))
        document.getElementById("pdf_photo").src = photoImg.src;

    var signImg = document.getElementById("signPreview");
    if (signImg && signImg.src && signImg.src.startsWith("data:"))
        document.getElementById("pdf_sign").src = signImg.src;

    document.getElementById("pdf_qrcode").innerHTML = "";
    new QRCode(document.getElementById("pdf_qrcode"), {
        text:   "App:" + g("applicationId") + "|Pay:" + paymentId + "|VivekUniversity",
        width:  80, height: 80
    });
}

// ══════════════════════════════════════════
// DOWNLOAD PDF
// ══════════════════════════════════════════
function downloadApplication() {
    var appId    = document.querySelector("[name='applicationId']").value;
    var template = document.getElementById("pdfDownloadTemplate");
    template.style.display = "block";
    html2pdf().set({
        margin:      [8,8,8,8],
        filename:    "BSC_Nursing_Application_" + appId + ".pdf",
        image:       { type:"jpeg", quality:0.98 },
        html2canvas: { scale:2, useCORS:true, logging:false },
        jsPDF:       { unit:"mm", format:"a4", orientation:"portrait" }
    }).from(template).save().then(function(){ template.style.display = "none"; });
}