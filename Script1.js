// AGE CALCULATOR
function calculateAge() {
    var dobVal = document.getElementById("dob").value;
    if (!dobVal) {
        document.getElementById("age").value = "";
        return;
    }
    var dob   = new Date(dobVal);
    var today = new Date();
    var age   = today.getFullYear() - dob.getFullYear();
    var m     = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    document.getElementById("age").value = age;
}

// ADDRESS SYNC
function syncAddress() {
    var check = document.getElementById("copyCheck");
    if (check.checked) {
        document.getElementById("chouse").value    = document.getElementById("phouse").value;
        document.getElementById("carea").value     = document.getElementById("parea").value;
        document.getElementById("cdistrict").value = document.getElementById("pdistrict").value;
        document.getElementById("ccity").value     = document.getElementById("pcity").value;
        document.getElementById("cstate").value    = document.getElementById("pstate").value;
        document.getElementById("cpin").value      = document.getElementById("ppin").value;
    } else {
        document.getElementById("chouse").value    = "";
        document.getElementById("carea").value     = "";
        document.getElementById("cdistrict").value = "";
        document.getElementById("ccity").value     = "";
        document.getElementById("cstate").value    = "";
        document.getElementById("cpin").value      = "";
    }
}

// 10th PERCENTAGE — auto calculates on typing
function calc10() {
    var max = parseFloat(document.getElementById("maxMarks10").value);
    var obt = parseFloat(document.getElementById("obtMarks10").value);
    if (!isNaN(max) && !isNaN(obt) && max > 0) {
        document.getElementById("per10").value = ((obt / max) * 100).toFixed(2);
    } else {
        document.getElementById("per10").value = "";
    }
}

// 12th PCB PERCENTAGE — auto calculates on typing
function calculatePCB() {
    var phy   = parseFloat(document.getElementById("physics").value)   || 0;
    var che   = parseFloat(document.getElementById("chemistry").value) || 0;
    var bio   = parseFloat(document.getElementById("biology").value)   || 0;
    var pct   = ((phy + che + bio) / 300) * 100;
    document.getElementById("percentage").value = pct.toFixed(2);
}

// PHOTO VALIDATION + PREVIEW (50KB)
document.getElementById("photoUpload").addEventListener("change", function () {
    var file = this.files[0];
    if (!file) return;
    if (file.size / 1024 > 50) {
        alert("Photo must be less than 50 KB. Your file: " + (file.size/1024).toFixed(1) + " KB");
        this.value = "";
        return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
        var img = document.getElementById("photoPreview");
        img.src = e.target.result;
        img.style.display = "block";
    };
    reader.readAsDataURL(file);
});

// SIGNATURE VALIDATION + PREVIEW (20KB)
document.getElementById("signatureUpload").addEventListener("change", function () {
    var file = this.files[0];
    if (!file) return;
    if (file.size / 1024 > 20) {
        alert("Signature must be less than 20 KB. Your file: " + (file.size/1024).toFixed(1) + " KB");
        this.value = "";
        return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
        var img = document.getElementById("signPreview");
        img.src = e.target.result;
        img.style.display = "block";
    };
    reader.readAsDataURL(file);
});

// OTHER DOCUMENTS VALIDATION (50KB)
["marksheet10", "marksheet12", "aadharUpload"].forEach(function(id) {
    document.getElementById(id).addEventListener("change", function () {
        if (this.files[0] && this.files[0].size / 1024 > 50) {
            alert("File must be less than 50 KB");
            this.value = "";
        }
    });
});

// PCB + ENGLISH VALIDATION
function validateForm() {
    var phy    = parseFloat(document.getElementById("physics").value)   || 0;
    var che    = parseFloat(document.getElementById("chemistry").value) || 0;
    var bio    = parseFloat(document.getElementById("biology").value)   || 0;
    var eng    = parseFloat(document.getElementById("english").value)   || 0;
    var pcbPct = ((phy + che + bio) / 300) * 100;

    if (pcbPct < 45) {
        alert("❌ PCB percentage is " + pcbPct.toFixed(2) + "%\nMinimum 45% required in PCB.");
        return false;
    }
    if (eng < 45) {
        alert("❌ English marks are " + eng + "\nMinimum 45 marks required in English.");
        return false;
    }
    return true;
}

// FORM SUBMIT
function handleSubmit(event) {
    event.preventDefault();

    var errors = [];

    if (!document.querySelector("[name='fullName']").value.trim())    errors.push("Full Name");
    if (!document.querySelector("[name='fatherName']").value.trim())  errors.push("Father's Name");
    if (!document.querySelector("[name='motherName']").value.trim())  errors.push("Mother's Name");
    if (!document.querySelector("[name='gender']").value)             errors.push("Gender");
    if (!document.querySelector("[name='dob']").value)                errors.push("Date of Birth");
    if (!document.querySelector("[name='mobile']").value.trim())      errors.push("Mobile Number");
    if (!document.querySelector("[name='email']").value.trim())       errors.push("Email Address");
    if (!document.querySelector("[name='aadhar']").value.trim())      errors.push("Aadhar Number");
    if (!document.querySelector("[name='category']").value)           errors.push("Category");
    if (!document.getElementById("phouse").value.trim())              errors.push("Permanent House/Village");
    if (!document.getElementById("parea").value.trim())               errors.push("Permanent Area/Post Office");
    if (!document.getElementById("pdistrict").value.trim())           errors.push("Permanent District");
    if (!document.getElementById("pcity").value.trim())               errors.push("Permanent City");
    if (!document.getElementById("pstate").value.trim())              errors.push("Permanent State");
    if (!document.getElementById("ppin").value.trim())                errors.push("Permanent Pincode");
    if (!document.getElementById("chouse").value.trim())              errors.push("Correspondence House/Village");
    if (!document.getElementById("carea").value.trim())               errors.push("Correspondence Area/Post Office");
    if (!document.getElementById("cdistrict").value.trim())           errors.push("Correspondence District");
    if (!document.getElementById("ccity").value.trim())               errors.push("Correspondence City");
    if (!document.getElementById("cstate").value.trim())              errors.push("Correspondence State");
    if (!document.getElementById("cpin").value.trim())                errors.push("Correspondence Pincode");
    if (!document.querySelector("[name='exam10']").value.trim())      errors.push("10th Examination");
    if (!document.querySelector("[name='board10']").value.trim())     errors.push("10th Board/University");
    if (!document.querySelector("[name='school10']").value.trim())    errors.push("10th School");
    if (!document.querySelector("[name='year10']").value)             errors.push("10th Year of Passing");
    if (!document.getElementById("maxMarks10").value)                 errors.push("10th Maximum Marks");
    if (!document.getElementById("obtMarks10").value)                 errors.push("10th Obtained Marks");
    if (!document.querySelector("[name='exam12']").value.trim())      errors.push("12th Examination");
    if (!document.querySelector("[name='board12']").value.trim())     errors.push("12th Board/University");
    if (!document.querySelector("[name='college12']").value.trim())   errors.push("12th College");
    if (!document.querySelector("[name='year12']").value)             errors.push("12th Year of Passing");
    if (!document.getElementById("physics").value)                    errors.push("Physics Marks");
    if (!document.getElementById("chemistry").value)                  errors.push("Chemistry Marks");
    if (!document.getElementById("biology").value)                    errors.push("Biology Marks");
    if (!document.getElementById("english").value)                    errors.push("English Marks");
    if (!document.querySelector("[name='subject12']").value)          errors.push("Subject");
    if (!document.getElementById("marksheet10").files[0])            errors.push("10th Marksheet");
    if (!document.getElementById("marksheet12").files[0])            errors.push("12th Marksheet");
    if (!document.getElementById("aadharUpload").files[0])           errors.push("Aadhar Card");
    if (!document.getElementById("photoUpload").files[0])            errors.push("Photo");
    if (!document.getElementById("signatureUpload").files[0])        errors.push("Signature");

    if (errors.length > 0) {
        alert("⚠️ Please fill all mandatory fields:\n\n" + errors.join("\n"));
        return false;
    }

    if (!validateForm()) return false;

    var appId   = "GNM" + Math.floor(Math.random() * 100000);
    var appDate = new Date().toISOString().split("T")[0];
    document.querySelector("[name='applicationId']").value   = appId;
    document.querySelector("[name='applicationDate']").value = appDate;

    // ✅ Opens popup instead
openPaymentPopup();
return false;
}

// RAZORPAY PAYMENT
function startPayment() {
    var options = {
        key:         "rzp_live_871H2Jybngmseo",
        amount:      1000,
        currency:    "INR",
        name:        "Vivek University",
        description: "GNM Nursing Application Fee",
        prefill: {
            name:    document.querySelector("[name='fullName']").value,
            email:   document.querySelector("[name='email']").value,
            contact: document.querySelector("[name='mobile']").value
        },
        theme: { color: "#2c3e7a" },
        handler: function (response) {
            closePaymentPopup(); 
            var payId = response.razorpay_payment_id;
            document.querySelector("[name='transactionId']").value   = payId;
            document.querySelector("[name='transactionDate']").value = new Date().toISOString().split("T")[0];
            populatePDFTemplate(payId);
            saveApplication(payId);
            document.getElementById("paymentSection").style.display  = "none";
            document.getElementById("downloadSection").style.display = "block";
            document.getElementById("downloadSection").scrollIntoView({ behavior: "smooth" });
            alert("✅ Payment Successful!\nPayment ID: " + payId);
        },
        modal: {
            ondismiss: function () {
                alert("Payment cancelled. Please try again.");
            }
        }
    };
    new Razorpay(options).open();
}

// POPULATE PDF TEMPLATE
function populatePDFTemplate(paymentId) {
    var f = document.getElementById("nursingForm");
    function g(name) {
        var el = f.querySelector("[name='" + name + "']");
        return el ? el.value : "";
    }

    document.getElementById("pdf_appId").textContent    = g("applicationId");
    document.getElementById("pdf_appDate").textContent  = g("applicationDate");
    document.getElementById("pdf_payId").textContent    = paymentId;
    document.getElementById("pdf_fullName").textContent   = g("fullName");
    document.getElementById("pdf_fatherName").textContent = g("fatherName");
    document.getElementById("pdf_motherName").textContent = g("motherName");
    document.getElementById("pdf_gender").textContent     = g("gender");
    document.getElementById("pdf_dob").textContent        = g("dob");
    document.getElementById("pdf_age").textContent        = document.getElementById("age").value;
    document.getElementById("pdf_mobile").textContent     = g("mobile");
    document.getElementById("pdf_email").textContent      = g("email");
    document.getElementById("pdf_aadhar").textContent     = g("aadhar");
    document.getElementById("pdf_category").textContent   = g("category");
    document.getElementById("pdf_phouse").textContent     = document.getElementById("phouse").value;
    document.getElementById("pdf_parea").textContent      = document.getElementById("parea").value;
    document.getElementById("pdf_pdistrict").textContent  = document.getElementById("pdistrict").value;
    document.getElementById("pdf_pcity").textContent      = document.getElementById("pcity").value;
    document.getElementById("pdf_pstate").textContent     = document.getElementById("pstate").value;
    document.getElementById("pdf_ppin").textContent       = document.getElementById("ppin").value;
    document.getElementById("pdf_chouse").textContent     = document.getElementById("chouse").value;
    document.getElementById("pdf_carea").textContent      = document.getElementById("carea").value;
    document.getElementById("pdf_cdistrict").textContent  = document.getElementById("cdistrict").value;
    document.getElementById("pdf_ccity").textContent      = document.getElementById("ccity").value;
    document.getElementById("pdf_cstate").textContent     = document.getElementById("cstate").value;
    document.getElementById("pdf_cpin").textContent       = document.getElementById("cpin").value;
    document.getElementById("pdf_exam10").textContent     = g("exam10");
    document.getElementById("pdf_board10").textContent    = g("board10");
    document.getElementById("pdf_school10").textContent   = g("school10");
    document.getElementById("pdf_year10").textContent     = g("year10");
    document.getElementById("pdf_maxMarks10").textContent = document.getElementById("maxMarks10").value;
    document.getElementById("pdf_obtMarks10").textContent = document.getElementById("obtMarks10").value;
    document.getElementById("pdf_percent10").textContent  = document.getElementById("per10").value;
    document.getElementById("pdf_exam12").textContent     = g("exam12");
    document.getElementById("pdf_board12").textContent    = g("board12");
    document.getElementById("pdf_college12").textContent  = g("college12");
    document.getElementById("pdf_year12").textContent     = g("year12");
    document.getElementById("pdf_physics").textContent    = document.getElementById("physics").value;
    document.getElementById("pdf_chemistry").textContent  = document.getElementById("chemistry").value;
    document.getElementById("pdf_biology").textContent    = document.getElementById("biology").value;
    document.getElementById("pdf_english").textContent    = document.getElementById("english").value;
    document.getElementById("pdf_pcbPercent").textContent = document.getElementById("percentage").value + "%";
    document.getElementById("pdf_subject").textContent    = g("subject12");

    var photoImg = document.getElementById("photoPreview");
    if (photoImg && photoImg.src && photoImg.src.startsWith("data:"))
        document.getElementById("pdf_photo").src = photoImg.src;

    var signImg = document.getElementById("signPreview");
    if (signImg && signImg.src && signImg.src.startsWith("data:"))
        document.getElementById("pdf_sign").src = signImg.src;

    document.getElementById("pdf_qrcode").innerHTML = "";
    new QRCode(document.getElementById("pdf_qrcode"), {
        text:   "App: " + g("applicationId") + " | Pay: " + paymentId + " | Vivek University GNM",
        width:  80,
        height: 80
    });
}

// DOWNLOAD PDF
function downloadApplication() {
    var appId    = document.querySelector("[name='applicationId']").value;
    var template = document.getElementById("pdfDownloadTemplate");
    template.style.display = "block";
    html2pdf().set({
        margin:      [8, 8, 8, 8],
        filename:    "GNM_Application_" + appId + ".pdf",
        image:       { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF:       { unit: "mm", format: "a4", orientation: "portrait" }
    }).from(template).save().then(function () {
        template.style.display = "none";
    });
}

// SAVE TO GOOGLE SHEET
function saveApplication(paymentId) {
    var params =
        "applicationId="   + encodeURIComponent(document.querySelector("[name='applicationId']").value) +
        "&applicationDate=" + encodeURIComponent(document.querySelector("[name='applicationDate']").value) +
        "&paymentId="       + encodeURIComponent(paymentId) +
        "&transactionDate=" + encodeURIComponent(new Date().toISOString().split("T")[0]) +
        "&fullName="        + encodeURIComponent(document.querySelector("[name='fullName']").value) +
        "&fatherName="      + encodeURIComponent(document.querySelector("[name='fatherName']").value) +
        "&motherName="      + encodeURIComponent(document.querySelector("[name='motherName']").value) +
        "&gender="          + encodeURIComponent(document.querySelector("[name='gender']").value) +
        "&dob="             + encodeURIComponent(document.querySelector("[name='dob']").value) +
        "&age="             + encodeURIComponent(document.getElementById("age").value) +
        "&mobile="          + encodeURIComponent(document.querySelector("[name='mobile']").value) +
        "&email="           + encodeURIComponent(document.querySelector("[name='email']").value) +
        "&aadhar="          + encodeURIComponent(document.querySelector("[name='aadhar']").value) +
        "&category="        + encodeURIComponent(document.querySelector("[name='category']").value) +
        "&phouse="          + encodeURIComponent(document.getElementById("phouse").value) +
        "&parea="           + encodeURIComponent(document.getElementById("parea").value) +
        "&pdistrict="       + encodeURIComponent(document.getElementById("pdistrict").value) +
        "&pcity="           + encodeURIComponent(document.getElementById("pcity").value) +
        "&pstate="          + encodeURIComponent(document.getElementById("pstate").value) +
        "&ppin="            + encodeURIComponent(document.getElementById("ppin").value) +
        "&chouse="          + encodeURIComponent(document.getElementById("chouse").value) +
        "&carea="           + encodeURIComponent(document.getElementById("carea").value) +
        "&cdistrict="       + encodeURIComponent(document.getElementById("cdistrict").value) +
        "&ccity="           + encodeURIComponent(document.getElementById("ccity").value) +
        "&cstate="          + encodeURIComponent(document.getElementById("cstate").value) +
        "&cpin="            + encodeURIComponent(document.getElementById("cpin").value) +
        "&exam10="          + encodeURIComponent(document.querySelector("[name='exam10']").value) +
        "&board10="         + encodeURIComponent(document.querySelector("[name='board10']").value) +
        "&school10="        + encodeURIComponent(document.querySelector("[name='school10']").value) +
        "&year10="          + encodeURIComponent(document.querySelector("[name='year10']").value) +
        "&maxMarks10="      + encodeURIComponent(document.getElementById("maxMarks10").value) +
        "&obtMarks10="      + encodeURIComponent(document.getElementById("obtMarks10").value) +
        "&percent10="       + encodeURIComponent(document.getElementById("per10").value) +
        "&exam12="          + encodeURIComponent(document.querySelector("[name='exam12']").value) +
        "&board12="         + encodeURIComponent(document.querySelector("[name='board12']").value) +
        "&college12="       + encodeURIComponent(document.querySelector("[name='college12']").value) +
        "&year12="          + encodeURIComponent(document.querySelector("[name='year12']").value) +
        "&physics="         + encodeURIComponent(document.getElementById("physics").value) +
        "&chemistry="       + encodeURIComponent(document.getElementById("chemistry").value) +
        "&biology="         + encodeURIComponent(document.getElementById("biology").value) +
        "&english="         + encodeURIComponent(document.getElementById("english").value) +
        "&pcbPercent="      + encodeURIComponent(document.getElementById("percentage").value) +
        "&subject12="       + encodeURIComponent(document.querySelector("[name='subject12']").value);

    // ✅ Use no-cors to avoid CORS block
    fetch("https://script.google.com/macros/s/AKfycbz7eVUU057kopeTFAh6AIoHcw_EDuQ4NNCAq04yDkEYj_X2JGZC916pMeMcYpKjVHs/exec", {
        method:  "POST",
        mode:    "no-cors",   // ← THIS is the key fix
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body:    params
    })
    .then(function() {
        console.log("✅ Data sent to Google Sheet");
    })
    .catch(function(err) {
        console.error("❌ Error:", err);
    });
}

function openPaymentPopup() {
    // Fill popup with applicant details
    document.getElementById("popupAppId").textContent =
        document.querySelector("[name='applicationId']").value;
    document.getElementById("popupName").textContent  =
        document.querySelector("[name='fullName']").value;

    // Show popup
    var popup = document.getElementById("paymentPopup");
    popup.style.display = "flex";
}

function closePaymentPopup() {
    document.getElementById("paymentPopup").style.display = "none";
}