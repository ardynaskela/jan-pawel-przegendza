// Czekaj aż Decap CMS się w pełni załaduje
if (window.CMS) {
  console.log('Registering preview templates...');

  // Preview dla Bio
  var BioPreview = window.createClass({
    render: function() {
      var entry = this.props.entry;
      var title = entry.getIn(['data', 'title']) || 'Jan Paweł Przegendza';
      var photo = entry.getIn(['data', 'photo']);
      var photoAlt = entry.getIn(['data', 'photoAlt']) || title;
      
      return window.h('div', {className: 'preview-wrapper'},
        window.h('div', {className: 'preview-grid'},
          window.h('div', {className: 'preview-photo-column'},
            photo ? window.h('img', {src: photo, alt: photoAlt, className: 'preview-photo'}) : null
          ),
          window.h('div', {className: 'preview-content-column'},
            window.h('h1', {className: 'preview-title'}, title),
            window.h('div', {className: 'preview-prose'}, this.props.widgetFor('body'))
          )
        )
      );
    }
  });

  // Preview dla Awards
  var AwardsPreview = window.createClass({
    render: function() {
      var entry = this.props.entry;
      var awards = entry.getIn(['data', 'awards']);
      
      var awardsList = null;
      if (awards && awards.size > 0) {
        var items = [];
        for (var i = 0; i < awards.size; i++) {
          var award = awards.get(i);
          var title = award.get('title');
          var year = award.get('year');
          var description = award.get('description');
          
          var text = title;
          if (year) text += ' (' + year + ')';
          if (description) text += ' — ' + description;
          
          items.push(window.h('li', {key: i, className: 'preview-award-item'}, text));
        }
        awardsList = window.h('ul', {className: 'preview-awards-list'}, items);
      } else {
        awardsList = window.h('p', {}, 'No awards yet.');
      }
      
      return window.h('div', {className: 'preview-wrapper'},
        window.h('h2', {className: 'preview-subtitle'}, 'Awards'),
        awardsList
      );
    }
  });

  // Preview dla Works
  var WorksPreview = window.createClass({
    render: function() {
      var entry = this.props.entry;
      var title = entry.getIn(['data', 'title']) || 'Untitled Work';
      var subtitle = entry.getIn(['data', 'subtitle']);
      
      return window.h('div', {className: 'preview-wrapper preview-simple'},
        window.h('h1', {className: 'preview-title'}, title),
        subtitle ? window.h('p', {className: 'preview-subtitle-text'}, subtitle) : null,
        window.h('div', {className: 'preview-prose'}, this.props.widgetFor('body'))
      );
    }
  });

  // Preview dla Events
  var EventsPreview = window.createClass({
    render: function() {
      var entry = this.props.entry;
      var title = entry.getIn(['data', 'title']) || 'Untitled Event';
      var date = entry.getIn(['data', 'date']);
      
      return window.h('div', {className: 'preview-wrapper preview-simple'},
        window.h('h2', {className: 'preview-event-title'}, title),
        date ? window.h('time', {className: 'preview-event-date'}, date) : null,
        window.h('div', {className: 'preview-prose'}, this.props.widgetFor('description'))
      );
    }
  });

  // Preview dla Media
  var MediaPreview = window.createClass({
    render: function() {
      var entry = this.props.entry;
      var title = entry.getIn(['data', 'title']) || 'Untitled Media';
      var type = entry.getIn(['data', 'type']) || 'video';
      var fileUrl = entry.getIn(['data', 'fileUrl']);
      var file = entry.getIn(['data', 'file']);
      var alt = entry.getIn(['data', 'alt']);
      
      var mediaContent = null;
      if (type === 'photo' && (fileUrl || file)) {
        mediaContent = window.h('img', {
          src: fileUrl || file,
          alt: alt || title,
          className: 'preview-media-image'
        });
      } else if (type === 'video') {
        mediaContent = window.h('p', {}, 'Video: ' + (fileUrl || file || 'No file'));
      }
      
      return window.h('div', {className: 'preview-wrapper preview-simple'},
        window.h('div', {className: 'preview-media-type'}, type === 'video' ? '🎥 Video' : '📷 Photo'),
        window.h('h2', {className: 'preview-event-title'}, title),
        alt ? window.h('p', {className: 'preview-media-alt'}, alt) : null,
        mediaContent
      );
    }
  });

  // Rejestracja preview templates
  CMS.registerPreviewTemplate('about-bio', BioPreview);
  CMS.registerPreviewTemplate('about-awards', AwardsPreview);
  CMS.registerPreviewTemplate('works', WorksPreview);
  CMS.registerPreviewTemplate('events', EventsPreview);
  CMS.registerPreviewTemplate('media-videos', MediaPreview);
  CMS.registerPreviewTemplate('media-photos', MediaPreview);

  // Style
  var styles = `
    .preview-wrapper {
      background: #0a0a0a;
      color: #e5e5e5;
      min-height: 100vh;
      padding: 2rem;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    .preview-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    @media (min-width: 1024px) {
      .preview-grid {
        grid-template-columns: 400px 1fr;
        gap: 3rem;
      }
    }
    .preview-photo {
      width: 100%;
      max-width: 400px;
      border-radius: 0 0 50% 50%;
    }
    .preview-title {
      font-size: 2.5rem;
      font-weight: 600;
      margin: 0 0 1rem 0;
      color: #e5e5e5;
    }
    .preview-subtitle {
      font-size: 1.875rem;
      font-weight: 600;
      margin: 2rem 0 1rem 0;
      color: #e5e5e5;
    }
    .preview-prose {
      font-size: 1.125rem;
      line-height: 1.75;
      color: #d4d4d4;
    }
    .preview-prose p {
      margin: 0 0 1rem 0;
    }
    .preview-awards-list {
      list-style: none;
      padding: 0;
      margin: 1rem 0;
    }
    .preview-award-item {
      padding: 0.5rem 0;
      color: #e5e5e5;
      font-size: 1.125rem;
    }
    .preview-award-item:before {
      content: '• ';
      margin-right: 0.5rem;
    }
    .preview-subtitle-text {
      font-size: 1.125rem;
      color: #d4d4d4;
      margin: 0.5rem 0 1.5rem 0;
    }
    .preview-event-title {
      font-size: 1.5rem;
      font-weight: 500;
      color: #e5e5e5;
      margin: 0 0 0.5rem 0;
    }
    .preview-event-date {
      font-size: 1rem;
      color: #e5e5e5;
      display: block;
      margin-bottom: 1rem;
    }
    .preview-media-type {
      font-size: 0.875rem;
      color: #a3a3a3;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }
    .preview-media-alt {
      color: #d4d4d4;
      margin: 0.5rem 0;
    }
    .preview-media-image {
      max-width: 100%;
      border-radius: 0.5rem;
      margin-top: 1rem;
    }
  `;
  
  var styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
  
  console.log('Preview templates registered successfully!');
}
