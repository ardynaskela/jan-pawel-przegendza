// Import React dla Decap CMS
const { Component, createElement: h } = window.React || {};

// Funkcja pomocnicza do konwersji Markdown na HTML
function markdownToHtml(markdown) {
  if (!markdown) return '';
  // Podstawowa konwersja markdown (możesz użyć biblioteki marked.js dla lepszych rezultatów)
  return markdown
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/\n/gim, '<br />');
}

// Preview dla Bio
class BioPreview extends Component {
  render() {
    const entry = this.props.entry;
    const title = entry.getIn(['data', 'title']) || 'Jan Paweł Przegendza';
    const photo = entry.getIn(['data', 'photo']);
    const photoAlt = entry.getIn(['data', 'photoAlt']) || title;
    const body = this.props.widgetFor('body');
    
    return h('div', { className: 'preview-wrapper' },
      h('div', { className: 'preview-grid' },
        // Photo column
        h('div', { className: 'preview-photo-column' },
          h('div', { className: 'preview-photo-container' },
            photo && h('img', {
              src: photo,
              alt: photoAlt,
              className: 'preview-photo'
            })
          )
        ),
        // Content column
        h('div', { className: 'preview-content-column' },
          h('h1', { className: 'preview-title' }, title),
          h('div', { className: 'preview-prose' }, body)
        )
      )
    );
  }
}

// Preview dla Awards
class AwardsPreview extends Component {
  render() {
    const entry = this.props.entry;
    const awards = entry.getIn(['data', 'awards']);
    
    return h('div', { className: 'preview-wrapper' },
      h('div', { className: 'preview-content-column preview-awards' },
        h('h2', { className: 'preview-subtitle' }, 'Awards'),
        awards && awards.size > 0
          ? h('ul', { className: 'preview-awards-list' },
              awards.map((award, index) =>
                h('li', { key: index, className: 'preview-award-item' },
                  h('span', { className: 'preview-bullet' }, '•'),
                  h('div', { className: 'preview-award-content' },
                    h('span', { className: 'preview-award-title' }, award.get('title')),
                    award.get('year') && h('span', {}, ` (${award.get('year')})`),
                    award.get('description') && h('span', {}, ` — ${award.get('description')}`)
                  )
                )
              ).toArray()
            )
          : h('p', { className: 'preview-no-awards' }, 'No awards yet.')
      )
    );
  }
}

// Preview dla Works
class WorksPreview extends Component {
  render() {
    const entry = this.props.entry;
    const title = entry.getIn(['data', 'title']);
    const subtitle = entry.getIn(['data', 'subtitle']);
    
    return h('div', { className: 'preview-wrapper preview-simple' },
      h('div', { className: 'preview-content-simple' },
        h('h1', { className: 'preview-title' }, title || 'Untitled Work'),
        subtitle && h('p', { className: 'preview-subtitle-text' }, subtitle),
        h('div', { className: 'preview-prose' }, this.props.widgetFor('body'))
      )
    );
  }
}

// Preview dla Events
class EventsPreview extends Component {
  render() {
    const entry = this.props.entry;
    const title = entry.getIn(['data', 'title']);
    const date = entry.getIn(['data', 'date']);
    const description = this.props.widgetFor('description');
    
    let formattedDate = '';
    if (date) {
      try {
        const dateObj = new Date(date);
        formattedDate = dateObj.toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) + ', ' + dateObj.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (e) {
        formattedDate = date;
      }
    }
    
    return h('div', { className: 'preview-wrapper preview-simple' },
      h('div', { className: 'preview-content-simple' },
        h('h2', { className: 'preview-event-title' }, title || 'Untitled Event'),
        formattedDate && h('time', { className: 'preview-event-date' }, formattedDate),
        description && h('div', { className: 'preview-prose preview-event-desc' }, description)
      )
    );
  }
}

// Preview dla Media
class MediaPreview extends Component {
  render() {
    const entry = this.props.entry;
    const title = entry.getIn(['data', 'title']);
    const type = entry.getIn(['data', 'type']) || 'video';
    const fileUrl = entry.getIn(['data', 'fileUrl']);
    const file = entry.getIn(['data', 'file']);
    const alt = entry.getIn(['data', 'alt']);
    
    return h('div', { className: 'preview-wrapper preview-simple' },
      h('div', { className: 'preview-content-simple' },
        h('div', { className: 'preview-media-type' }, type === 'video' ? '🎥 Video' : '📷 Photo'),
        h('h2', { className: 'preview-event-title' }, title || 'Untitled Media'),
        alt && h('p', { className: 'preview-media-alt' }, alt),
        (fileUrl || file) && h('div', { className: 'preview-media-file' },
          type === 'photo' && (fileUrl || file) && h('img', {
            src: fileUrl || file,
            alt: alt || title,
            className: 'preview-media-image'
          }),
          type === 'video' && (fileUrl || file) && h('p', {}, '🎬 Video file: ', fileUrl || file)
        )
      )
    );
  }
}

// Rejestracja preview templates
if (window.CMS) {
  CMS.registerPreviewTemplate('about-bio', BioPreview);
  CMS.registerPreviewTemplate('about-awards', AwardsPreview);
  CMS.registerPreviewTemplate('works', WorksPreview);
  CMS.registerPreviewTemplate('events', EventsPreview);
  CMS.registerPreviewTemplate('media-videos', MediaPreview);
  CMS.registerPreviewTemplate('media-photos', MediaPreview);
}

// Style dla preview
const previewStyles = `
  .preview-wrapper {
    background: #0a0a0a;
    color: #e5e5e5;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    padding: 1rem;
  }

  .preview-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
    min-height: 100vh;
  }

  @media (min-width: 1024px) {
    .preview-grid {
      grid-template-columns: minmax(0, 520px) 1fr;
      gap: 3rem;
      padding: 0 3rem;
    }
  }

  .preview-photo-column {
    position: relative;
  }

  @media (min-width: 1024px) {
    .preview-photo-column {
      position: sticky;
      top: 0;
      height: fit-content;
    }
  }

  .preview-photo-container {
    overflow: hidden;
    border-radius: 0 0 50% 50%;
  }

  .preview-photo {
    width: 100%;
    height: 480px;
    object-fit: cover;
    display: block;
  }

  @media (min-width: 640px) {
    .preview-photo {
      height: 800px;
    }
  }

  @media (min-width: 1024px) {
    .preview-photo {
      height: calc(100vh - 6rem);
    }
  }

  .preview-content-column {
    padding-top: 1rem;
  }

  @media (min-width: 640px) {
    .preview-content-column {
      padding-top: 2rem;
    }
  }

  .preview-title {
    font-size: 2.5rem;
    font-weight: 600;
    line-height: 1.1;
    margin: 0 0 1rem 0;
    color: #e5e5e5;
  }

  @media (min-width: 640px) {
    .preview-title {
      font-size: 3rem;
    }
  }

  @media (min-width: 1024px) {
    .preview-title {
      font-size: 3.75rem;
    }
  }

  .preview-subtitle {
    font-size: 1.875rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
    color: #e5e5e5;
  }

  @media (min-width: 1024px) {
    .preview-subtitle {
      font-size: 2.25rem;
    }
  }

  .preview-prose {
    font-size: 1.125rem;
    line-height: 1.75;
    color: #d4d4d4;
    max-width: none;
  }

  @media (min-width: 1280px) {
    .preview-prose {
      font-size: 1.25rem;
    }
  }

  .preview-prose p {
    margin: 0 0 1rem 0;
    line-height: 1.625;
  }

  .preview-prose h1,
  .preview-prose h2,
  .preview-prose h3 {
    color: #e5e5e5;
    font-weight: 600;
    margin: 2rem 0 1rem 0;
  }

  .preview-prose strong {
    font-weight: 600;
    color: #e5e5e5;
  }

  .preview-prose em {
    font-style: italic;
  }

  .preview-awards {
    padding-top: 4rem;
  }

  .preview-awards-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .preview-award-item {
    display: flex;
    align-items: start;
    gap: 0.5rem;
    font-size: 1.125rem;
    line-height: 1.75;
    color: #e5e5e5;
  }

  @media (min-width: 1280px) {
    .preview-award-item {
      font-size: 1.25rem;
    }
  }

  .preview-bullet {
    flex-shrink: 0;
    line-height: 1.625;
    font-size: 1.5rem;
  }

  .preview-award-content {
    min-width: 0;
  }

  .preview-award-title {
    font-weight: 500;
  }

  .preview-no-awards {
    color: #e5e5e5;
  }

  /* Simple layout dla Works, Events, Media */
  .preview-simple {
    padding: 2rem 1rem;
  }

  @media (min-width: 640px) {
    .preview-simple {
      padding: 2rem 3rem;
    }
  }

  .preview-content-simple {
    padding-top: 1rem;
  }

  @media (min-width: 640px) {
    .preview-content-simple {
      padding-top: 2rem;
    }
  }

  .preview-subtitle-text {
    font-size: 1.125rem;
    color: #d4d4d4;
    margin: 0.5rem 0 1.5rem 0;
  }

  @media (min-width: 1024px) {
    .preview-subtitle-text {
      font-size: 1.25rem;
    }
  }

  .preview-event-title {
    font-size: 1.25rem;
    font-weight: 500;
    color: #e5e5e5;
    margin: 0 0 0.5rem 0;
  }

  @media (min-width: 1024px) {
    .preview-event-title {
      font-size: 1.5rem;
    }
  }

  .preview-event-date {
    font-size: 1rem;
    color: #e5e5e5;
    display: block;
    margin-bottom: 0.5rem;
  }

  @media (min-width: 1024px) {
    .preview-event-date {
      font-size: 1.125rem;
    }
  }

  .preview-event-desc {
    font-size: 1rem;
    color: #d4d4d4;
    max-width: 42rem;
  }

  @media (min-width: 1024px) {
    .preview-event-desc {
      font-size: 1.125rem;
    }
  }

  .preview-media-type {
    font-size: 0.875rem;
    color: #a3a3a3;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
  }

  .preview-media-alt {
    font-size: 1rem;
    color: #d4d4d4;
    margin: 0.5rem 0 1rem 0;
  }

  .preview-media-file {
    margin-top: 1.5rem;
  }

  .preview-media-image {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
  }
`;

// Dodaj style do dokumentu
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = previewStyles;
  document.head.appendChild(styleSheet);
}
