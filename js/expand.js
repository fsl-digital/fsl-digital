// expand.js
export function initializeExpandableContent() {
    document.querySelectorAll('.show-more').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const teamMember = link.closest('.team-member');
            const expandedContent = teamMember.querySelector('.expanded-content');
            
            if (!expandedContent) {
                // Create expanded content if it doesn't exist
                const content = document.createElement('div');
                content.className = 'expanded-content';
                content.style.display = 'none';
                content.innerHTML = getExpandedContent(teamMember);
                
                // Insert after the contact section
                teamMember.insertBefore(content, link.parentElement.nextSibling);
            }
            
            const content = teamMember.querySelector('.expanded-content');
            const isExpanded = content.style.display === 'block';
            
            // Toggle content visibility
            content.style.display = isExpanded ? 'none' : 'block';
            
            // Update arrow icon
            const arrow = link.querySelector('i');
            arrow.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(90deg)';
        });
    });
}

function getExpandedContent(teamMember) {
    const memberName = teamMember.querySelector('.member-name').textContent;
    
    // Return specific content based on the member
    if (memberName === 'Dr. Josephine Klingebeil-Schieke') {
        return `
            <div class="expanded-details">
                <h4>Research Focus</h4>
                <ul>
                    <li>Historical Foreign Language Teaching Materials</li>
                    <li>Language History</li>
                    <li>Early Modern European Multilingualism</li>
                </ul>
                
                <h4>Projects</h4>
                <ul>
                    <li>Digital Historical Foreign Language Teaching Materials</li>
                    <li>Language Concepts in Historical Context</li>
                    <li>Everyday Communication in Early Modern Europe</li>
                </ul>
            </div>
        `;
    }
    
    // Default content for other members
    return `
        <div class="expanded-details">
            <p>Additional information coming soon...</p>
        </div>
    `;
}
