function FooterAndCart(){
    return (
        <> 
            <section className="section-cart">
                <a href="/cart" className="cart">
                    CART <i className="fas fa-shopping-bag"></i>
                </a>
            </section>    
            <footer>
                <div className="container">
                    <ul className="navi-social">
                        <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                        <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                        <li><a href="#"><i className="fab fa-youtube"></i></a></li>
                        <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                    </ul>
                    <p className="copyright">&copy;MERN STACK PROJECT 2019, All rights reserved, designed and developed by S. J. R. Wimalasuriya.</p>
                </div>
                
            </footer>
        </>        
    )
}

export default FooterAndCart;