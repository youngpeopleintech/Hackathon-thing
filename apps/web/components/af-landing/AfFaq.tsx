'use client';

import { useMemo, useState } from 'react';
import { Reveal } from './Reveal';
import { FAQ_CATEGORIES, FAQ_ITEMS, type FaqCategory } from './faq-data';

export function AfFaq() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('general');
  const [openId, setOpenId] = useState<string | null>('g1');

  const visibleItems = useMemo(
    () => FAQ_ITEMS.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  function selectCategory(cat: FaqCategory) {
    setActiveCategory(cat);
    const first = FAQ_ITEMS.find((item) => item.category === cat);
    setOpenId(first?.id ?? null);
  }

  function toggleItem(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <section id="faq" className="section section-white">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">FAQ</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="section-headline">Everything you need to know.</h2>
        </Reveal>
        <div className="faq-grid">
          <Reveal className="faq-sidebar">
            {FAQ_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                role="button"
                tabIndex={0}
                className={`faq-cat${activeCategory === cat.id ? ' active' : ''}`}
                onClick={() => selectCategory(cat.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectCategory(cat.id);
                  }
                }}
              >
                {cat.label}
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.1}>
            <div id="faqList">
              {visibleItems.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div key={item.id} className={`faq-item${isOpen ? ' open' : ''}`} data-cat={item.category}>
                    <div
                      role="button"
                      tabIndex={0}
                      className="faq-q"
                      onClick={() => toggleItem(item.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleItem(item.id);
                        }
                      }}
                    >
                      {item.question}
                      <span className="faq-icon">+</span>
                    </div>
                    <div className="faq-a">
                      <div className="faq-a-inner">{item.answer}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
