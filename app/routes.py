# app/routes.py
from flask import Blueprint, render_template

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    # Sample perfume data
    perfumes = [
        {
            "name": "夏日晨露",
            "description": "清新的晨露香气，带来一天的美好开始",
            "image": "/static/images/perfume1.jpg",
            "top_notes": "柑橘、薄荷",
            "middle_notes": "茉莉、玫瑰",
            "base_notes": "麝香、雪松"
        },
        {
            "name": "海边微风",
            "description": "温柔的海风气息，让人沉醉于夏日海滩",
            "image": "/static/images/perfume2.jpg",
            "top_notes": "海盐、柠檬",
            "middle_notes": "依兰、椰子",
            "base_notes": "檀香、香草"
        },
        {
            "name": "花园漫步",
            "description": "漫步在盛夏的花园中，感受繁花的芬芳",
            "image": "/static/images/perfume3.jpg",
            "top_notes": "青苹果、小苍兰",
            "middle_notes": "铃兰、牡丹",
            "base_notes": "琥珀、白麝香"
        }
    ]
    return render_template('index.html', perfumes=perfumes)

@main_bp.route('/health')
def health():
    return {"status": "healthy"}