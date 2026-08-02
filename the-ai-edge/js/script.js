function animateValue(id, start, end, duration, prefix = "", suffix = "") {
    const element = document.getElementById(id);

    // Do nothing if the element is not on this page
    if (!element) return;

    const range = end - start;
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;

        const progress = Math.min(
            (timestamp - startTime) / duration,
            1
        );

        const currentValue = Math.floor(
            progress * range + start
        );

        element.textContent =
            `${prefix}${currentValue}${suffix}`;

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}


function calculate() {
    const rate = Number(
        document.getElementById("rate").value
    );

    const hours = Number(
        document.getElementById("hours").value
    );

    const saving = Number(
        document.getElementById("saving").value
    );

    const weeks = Number(
        document.getElementById("weeks").value
    );

    if (!rate || !hours) {
        alert(
            "Please enter your hourly rate and weekly hours."
        );
        return;
    }

    // Weekly time saved
    const weeklyHoursSaved = hours * saving;

    // Monthly calculations
    const monthlyHoursSaved =
        weeklyHoursSaved * 4.33;

    const monthlyValue =
        monthlyHoursSaved * rate;

    // Yearly calculation
    const yearlyValue =
        weeklyHoursSaved * weeks * rate;


    // Update calculator results
    animateValue(
        "timeSaved",
        0,
        Math.round(monthlyHoursSaved),
        1200,
        "",
        " hrs/mo"
    );

    animateValue(
        "moneySaved",
        0,
        Math.round(monthlyValue),
        1200,
        "$",
        "/mo"
    );

    animateValue(
        "yearlySaved",
        0,
        Math.round(yearlyValue),
        1500,
        "$",
        "/yr"
    );


    // Save results for the homepage
    localStorage.setItem(
        "aiRate",
        rate.toFixed(0)
    );

    localStorage.setItem(
        "aiTimeSaved",
        Math.round(weeklyHoursSaved)
    );

    localStorage.setItem(
        "aiAnnualValue",
        Math.round(yearlyValue)
    );


    // Save calculator values for the homepage
localStorage.setItem("aiRate", rate.toFixed(0));

localStorage.setItem(
    "aiTimeSaved",
    Math.round(weeklyHoursSaved)
);

localStorage.setItem(
    "aiAnnualValue",
    Math.round(yearlyValue)
);


// Show calculator results
const result =
    document.getElementById("result");

if (result) {
    result.style.display = "block";
}


    // Track calculator use
    trackCalculator();
}


function trackCalculator() {
    if (typeof gtag === "function") {
        gtag("event", "calculator_completed", {
            calculator_name:
                "AI Time Savings Calculator"
        });
    }
}