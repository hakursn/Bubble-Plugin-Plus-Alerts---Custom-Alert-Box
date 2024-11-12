function(properties, context) {
    const alertBox = document.getElementById('custom-alert');
    const alertTitle = document.getElementById('alert-title');
    const alertDescription = document.getElementById('alert-description');
    const alertIcon = document.getElementById('alert-icon');
    const closeButton = document.getElementById('close-button');

    const predefinedAnimations = {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        fadeOut: 'fadeOut 0.5s ease-in-out',
        slideInFromLeft: 'slideInFromLeft 0.5s ease-in-out',
        slideInFromRight: 'slideInFromRight 0.5s ease-in-out',
        slideInFromTop: 'slideInFromTop 0.5s ease-in-out',
        slideInFromBottom: 'slideInFromBottom 0.5s ease-in-out',
        bounceIn: 'bounceIn 0.75s ease-in-out',
        rotateIn: 'rotateIn 0.5s ease-in-out',
        rotateOut: 'rotateOut 0.5s ease-in-out',
        zoomIn: 'zoomIn 0.5s ease-in-out',
        zoomOut: 'zoomOut 0.5s ease-in-out',
        flipInX: 'flipInX 0.6s ease-in-out',
        flipInY: 'flipInY 0.6s ease-in-out',
        shake: 'shake 0.8s ease-in-out'
    };

    // Dynamically load the custom font from Google Fonts (if provided)
    const customFont = properties.font || ''; // Use properties.font for custom font
    if (customFont) {
        const fontLink = document.createElement('link');
        fontLink.href = `https://fonts.googleapis.com/css2?family=${customFont.replace(' ', '+')}:wght@400;700&display=swap`;
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);
    }

    // Define predefined styles and their default icons
    const predefinedStyles = {
        Success: {
            borderColor: context.keys.successBorderColor || "#28a745",
            backgroundColor: context.keys.successBackgroundColor || "#dff0d8",
            titleFontSize: (context.keys.successtitlefontsize || '18') + 'px',
            titleFontColor: context.keys.successTitleFontColor || "#155724",
            descriptionFontSize: (context.keys.successdescriptionfontsize || '14') + 'px',
            descriptionFontColor: context.keys.successDescriptionFontColor || "#155724",
            borderWidth: (context.keys.successborderwidth || '1') + 'px',
            icon: 'success'
        },
        Warning: {
            borderColor: context.keys.warningBorderColor || "#ffc107",
            backgroundColor: context.keys.warningBackgroundColor || "#fff3cd",
            titleFontSize: (context.keys.warningtitlefontsize || '18') + 'px',
            titleFontColor: context.keys.warningTitleFontColor || "#856404",
            descriptionFontSize: (context.keys.warningdescriptionfontsize || '14') + 'px',
            descriptionFontColor: context.keys.warningDescriptionFontColor || "#856404",
            borderWidth: (context.keys.warningborderwidth || '1') + 'px',
            icon: 'warning'
        },
        Info: {
            borderColor: context.keys.infoBorderColor || "#17a2b8",
            backgroundColor: context.keys.infoBackgroundColor || "#d1ecf1",
            titleFontSize: (context.keys.infotitlefontsize || '18') + 'px',
            titleFontColor: context.keys.infoTitleFontColor || "#0c5460",
            descriptionFontSize: (context.keys.infodescriptionfontsize || '14') + 'px',
            descriptionFontColor: context.keys.infoDescriptionFontColor || "#0c5460",
            borderWidth: (context.keys.infoborderwidth || '1') + 'px',
            icon: 'info'
        },
        Error: {
            borderColor: context.keys.errorBorderColor || "#dc3545",
            backgroundColor: context.keys.errorBackgroundColor || "#f8d7da",
            titleFontSize: (context.keys.errortitlefontsize || '18') + 'px',
            titleFontColor: context.keys.errorTitleFontColor || "#721c24",
            descriptionFontSize: (context.keys.errordescriptionfontsize || '14') + 'px',
            descriptionFontColor: context.keys.errorDescriptionFontColor || "#721c24",
            borderWidth: (context.keys.errorborderwidth || '1') + 'px',
            icon: 'error'
        },
        Custom: {
            borderColor: properties.bordercolor,
            backgroundColor: properties.backgroundcolor,
            titleFontSize: (properties.titlefontsize || '18') + 'px',
            titleFontColor: properties.titlefontcolor,
            descriptionFontSize: (properties.descriptionfontsize || '14') + 'px',
            descriptionFontColor: properties.descriptionfontcolor,
            borderWidth: (properties.borderwidth || '1') + 'px',
            icon: properties.icon || ''
        }
    };

    const iconMap = {
        success: "✔️",
        warning: "⚠️",
        info: "ℹ️",
        error: "❌",
    };

    const appliedStyle = predefinedStyles[properties.type];

    alertTitle.innerText = properties.title || 'Alert Title';
    alertDescription.innerText = properties.description || 'Alert Description';

    const iconKey = appliedStyle.icon;
    alertIcon.innerText = iconKey ? iconMap[iconKey] || '' : '';
    alertIcon.style.display = properties.showicon ? 'inline' : 'none';
    closeButton.style.display = properties.showclosebutton ? 'inline' : 'none';

    alertBox.style.borderColor = appliedStyle.borderColor;
    alertBox.style.backgroundColor = appliedStyle.backgroundColor;
    alertBox.style.borderWidth = appliedStyle.borderWidth;
    alertTitle.style.fontSize = appliedStyle.titleFontSize;
    alertTitle.style.color = appliedStyle.titleFontColor;
    alertDescription.style.fontSize = appliedStyle.descriptionFontSize;
    alertDescription.style.color = appliedStyle.descriptionFontColor;

    // Apply the custom font to the alert box
    if (customFont) {
        alertBox.style.fontFamily = `'${customFont}', sans-serif`;
    }

    let position = properties.position || 'Bottom Right';
    alertBox.style.position = 'fixed';
    alertBox.style.top = alertBox.style.bottom = alertBox.style.left = alertBox.style.right = 'unset';
    alertBox.style.animation = predefinedAnimations[properties.animation];

    switch(position) {
        case 'Top Right': alertBox.style.top = '20px'; alertBox.style.right = '20px'; break;
        case 'Top Left': alertBox.style.top = '20px'; alertBox.style.left = '20px'; break;
        case 'Top Middle': alertBox.style.top = '20px'; alertBox.style.left = '50%'; alertBox.style.transform = 'translateX(-50%)'; break;
        case 'Bottom Right': alertBox.style.bottom = '20px'; alertBox.style.right = '20px'; break;
        case 'Bottom Left': alertBox.style.bottom = '20px'; alertBox.style.left = '20px'; break;
        case 'Bottom Middle': alertBox.style.bottom = '20px'; alertBox.style.left = '50%'; alertBox.style.transform = 'translateX(-50%)'; break;
    }

    alertBox.style.display = 'block';
    setTimeout(() => alertBox.style.display = 'none', properties.timing || 5000);
    closeButton.onclick = () => alertBox.style.display = 'none';
}
