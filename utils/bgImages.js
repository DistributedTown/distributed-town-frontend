const bgImages = {
  company:
    'https://images.unsplash.com/photo-1512403754473-27835f7b9984?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=716&q=80',
  'community life':
    'https://images.unsplash.com/photo-1587653263995-422546a7a569?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=752&q=80',
  teaching:
    'https://images.unsplash.com/photo-1576834967753-ad2cf1cc8d19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=796&q=80',
  accounting:
    'https://images.unsplash.com/photo-1574607383077-47ddc2dc51c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80',
  'fun & entertainment':
    'https://images.unsplash.com/photo-1565009520170-c809ddd9ac3c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80',
  'leadership & public speaking':
    'https://images.unsplash.com/photo-1521424159246-e4a66f267e4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  cooking:
    'https://images.unsplash.com/photo-1549590143-d5855148a9d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  legal:
    'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  householding:
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=802&q=80',
  gardening:
    'https://images.unsplash.com/photo-1526381805515-3fec2d69e7cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=616&q=80',
  'administration & management':
    'https://images.unsplash.com/photo-1553034545-32d4cd2168f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  'art, music & creativity':
    'https://images.unsplash.com/photo-1524567248408-cbfd37e65e2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  backend:
    'https://images.unsplash.com/photo-1572985025310-cc8cafbbf394?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=658&q=80',
  painting:
    'https://images.unsplash.com/photo-1505840541251-02ab21f95b45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3016&q=80',
  architecture:
    'https://images.unsplash.com/photo-1511857963324-9aab834f68f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=650&q=80',
  'web dev':
    'https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80',
  frontend:
    'https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  tokenomics:
    'https://images.unsplash.com/photo-1585924775990-bd3f24bbc72e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80',
  'mobile dev':
    'https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  'network design': 'https://unsplash.com/photos/FewHpO4VC9Y',
  defi:
    'https://images.unsplash.com/photo-1585504256855-6718f7a693ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  'blockchain infrastructure':
    'https://images.unsplash.com/photo-1581117308254-755c73f315db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  'smart contracts':
    'https://images.unsplash.com/photo-1568057373484-69bbc440c02e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80',
  'game theory':
    'https://images.unsplash.com/photo-1556084123-fe76122cd5d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=752&q=80',
  music:
    'https://images.unsplash.com/photo-1492563817904-5f1dc687974f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  'governance & consensus':
    'https://images.unsplash.com/photo-1583394885876-f7744b77051f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=752&q=80',
  photography:
    'https://images.unsplash.com/photo-1552168324-d612d77725e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=752&q=80',
  gaming:
    'https://images.unsplash.com/photo-1586182987320-4f376d39d787?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  'video-making':
    'https://images.unsplash.com/photo-1528109966604-5a6a4a964e8d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  hiking:
    'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  writing:
    'https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=682&q=80',
  'project management':
    'https://images.unsplash.com/photo-1553034545-32d4cd2168f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  'performance & theather':
    'https://images.unsplash.com/photo-1510731491328-7363eecd7b2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  biking:
    'https://images.unsplash.com/photo-1523815378073-a43ae3fbf36a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2788&q=80',
  production:
    'https://images.unsplash.com/photo-1597765206558-6f4e06954f2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  'training & sport':
    'https://images.unsplash.com/photo-1505232219783-f1b72c5880e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
  default:
    'https://images.unsplash.com/photo-1505232219783-f1b72c5880e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
};

export default bgImages;
