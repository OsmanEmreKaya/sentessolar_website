// ============================================
// Stations Map Interactive Features
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const markers = document.querySelectorAll('.station-marker');
    const tooltip = document.getElementById('mapTooltip');
    
    if (!tooltip) return;
    
    const tooltipCity = tooltip.querySelector('.tooltip-city');
    const tooltipCount = tooltip.querySelector('.tooltip-count');
    const mapContainer = document.querySelector('.turkey-map-container');
    
    if (!mapContainer) return;
    
    markers.forEach(marker => {
        const city = marker.getAttribute('data-city');
        const count = marker.getAttribute('data-count');
        const markerDot = marker.querySelector('.marker-dot');
        const markerCircle = marker.querySelector('circle');
        
        if (!markerDot || !markerCircle) return;
        
        let tooltipTimeout;
        
        marker.addEventListener('mouseenter', function(e) {
            // Clear any pending timeout
            clearTimeout(tooltipTimeout);
            
            // Get marker position - use the circle element for stable positioning
            const markerRect = markerCircle.getBoundingClientRect();
            const mapRect = mapContainer.getBoundingClientRect();
            
            // Set tooltip content
            tooltipCity.textContent = city || 'Bilinmeyen Şehir';
            tooltipCount.textContent = `${count} Santral`;
            
            // Calculate tooltip position relative to map container
            // Position tooltip above the marker
            const tooltipX = markerRect.left - mapRect.left + (markerRect.width / 2);
            const tooltipHeight = tooltip.offsetHeight || 60; // Estimate if not yet visible
            const tooltipY = markerRect.top - mapRect.top - tooltipHeight - 5; // 5px gap above marker
            
            // Show and position tooltip
            tooltip.style.display = 'block';
            tooltip.style.left = tooltipX + 'px';
            tooltip.style.top = tooltipY + 'px';
            tooltip.style.transform = 'translateX(-50%)';
            
            // Adjust position after tooltip is visible to get accurate height
            requestAnimationFrame(() => {
                const actualHeight = tooltip.offsetHeight;
                tooltip.style.top = (markerRect.top - mapRect.top - actualHeight - 5) + 'px';
            });
            
            // Update marker appearance
            markerDot.setAttribute('r', '14');
            markerDot.setAttribute('fill', '#ff8c00');
        });
        
        marker.addEventListener('mouseleave', function() {
            // Hide tooltip with slight delay to prevent flickering
            tooltipTimeout = setTimeout(() => {
                tooltip.style.display = 'none';
            }, 100);
            
            // Reset marker appearance
            markerDot.setAttribute('r', '10');
            markerDot.setAttribute('fill', '#086838');
        });
        
        // Mobile touch events
        marker.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // Clear any pending timeout
            clearTimeout(tooltipTimeout);
            
            // Get marker position - use the circle element for stable positioning
            const markerRect = markerCircle.getBoundingClientRect();
            const mapRect = mapContainer.getBoundingClientRect();
            
            // Set tooltip content
            tooltipCity.textContent = city || 'Bilinmeyen Şehir';
            tooltipCount.textContent = `${count} Santral`;
            
            // Calculate tooltip position relative to map container
            const tooltipX = markerRect.left - mapRect.left + (markerRect.width / 2);
            const tooltipHeight = tooltip.offsetHeight || 60;
            const tooltipY = markerRect.top - mapRect.top - tooltipHeight - 5;
            
            // Show and position tooltip
            tooltip.style.display = 'block';
            tooltip.style.left = tooltipX + 'px';
            tooltip.style.top = tooltipY + 'px';
            tooltip.style.transform = 'translateX(-50%)';
            
            // Adjust position after tooltip is visible
            requestAnimationFrame(() => {
                const actualHeight = tooltip.offsetHeight;
                tooltip.style.top = (markerRect.top - mapRect.top - actualHeight - 5) + 'px';
            });
            
            // Update marker appearance
            markerDot.setAttribute('r', '14');
            markerDot.setAttribute('fill', '#ff8c00');
            
            // Ensure label stays visible
            const label = marker.querySelector('.marker-label');
            if (label) {
                label.style.opacity = '1';
                label.style.visibility = 'visible';
            }
        });
        
        // Hide tooltip when clicking outside on mobile (only once, not per marker)
        if (!window.mapTooltipHandlerAdded) {
            window.mapTooltipHandlerAdded = true;
            document.addEventListener('touchstart', function(e) {
                const clickedMarker = e.target.closest('.station-marker');
                const clickedTooltip = e.target.closest('.map-tooltip');
                
                if (!clickedMarker && !clickedTooltip) {
                    // Hide all tooltips
                    tooltip.style.display = 'none';
                    // Reset all markers
                    markers.forEach(m => {
                        const dot = m.querySelector('.marker-dot');
                        if (dot) {
                            dot.setAttribute('r', '10');
                            dot.setAttribute('fill', '#086838');
                        }
                    });
                }
            }, true);
        }
        
        // Prevent tooltip from hiding when hovering over it
        tooltip.addEventListener('mouseenter', function() {
            clearTimeout(tooltipTimeout);
        });
        
        tooltip.addEventListener('mouseleave', function() {
            tooltip.style.display = 'none';
        });
    });
});

