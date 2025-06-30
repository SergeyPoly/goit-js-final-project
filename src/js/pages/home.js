import { renderQuote } from '../renderers/quote';
import { loadHeader } from '../services/header'
import '../renderers/section-exercises';
import { initFooterForm } from '../services/footer-form';
import { initScrollToTop } from '../services/scroll-to-top';

export const homePage = () => {
  loadHeader();
  renderQuote();
  initFooterForm();
  initScrollToTop();
}