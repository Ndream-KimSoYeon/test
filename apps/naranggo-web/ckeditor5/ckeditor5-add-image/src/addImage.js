import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import AddImageIcon from '../theme/icons/photo.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import View from '@ckeditor/ckeditor5-ui/src/view';

class AddImage extends Plugin {
  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add('addImage', (locale) => {
      const view = new View(locale);
      const addImageButton = new ButtonView(locale);

      addImageButton.set({
        label: editor.locale.t('사진 추가'),
        icon: AddImageIcon,
        tooltip: true
      });

      addImageButton // Callback executed once the image is clicked.
        .on('execute', () => {
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({
                type: 'IMAGE_PICKER',
                boyd: 'open'
              })
            );
          } else {
            alert('이미지 첨부는 모바일에서만 가능합니다.');
          }
        });

      view.setTemplate({
        tag: 'div',
        children: [addImageButton]
      });

      return view;
    });

    document.addEventListener('message', this._handlePickerImage.bind(this));
  }

  _handlePickerImage(event) {
    const { type, body } = JSON.parse(event.data);

    if (type === 'IMAGE_PICKED') {
      this.editor.execute('insertImage', {
        source: body
      });
    }
  }
}

export default AddImage;
