// Simple coupon application functionality
document.querySelectorAll('.apply-coupon').forEach(button => {
    button.addEventListener('click', function() {
        const couponCode = this.parentElement.querySelector('.coupon-code').textContent;
        alert(`Coupon ${couponCode} has been copied to your clipboard!\nApply it during checkout.`);
        // In a real implementation, you would:
        // 1. Store the selected coupon in localStorage/session
        // 2. Redirect to booking page with coupon pre-applied
        // 3. Or copy to clipboard for manual application
    });
});